import { NextRequest, NextResponse } from "next/server";

const RESEND_KEY = process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = "andrew@twocores.com";
const MAX_BODY_BYTES = 20_000;
const MAX_MESSAGE_LENGTH = 4_000;
const MIN_SUBMIT_TIME_MS = 2_500;
const MAX_RATE_LIMIT_ENTRIES = 1_000;
const VALID_TOPICS = new Set([
  "general",
  "sales",
  "support",
  "integration",
  "partnership",
]);

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Message is too large" },
      { status: 413 }
    );
  }

  const contentType = req.headers.get("content-type") || "";
  const isJsonRequest = contentType.includes("application/json");
  let body: Record<string, unknown> = {};

  try {
    if (isJsonRequest) {
      const parsed = await req.json();
      body = isRecord(parsed) ? parsed : {};
    } else {
      const form = await req.formData();
      body = Object.fromEntries(
        Array.from(form.entries()).map(([k, v]) => [k, String(v)])
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = getString(body, "name");
  const email = getString(body, "email").toLowerCase();
  const company = getString(body, "company");
  const topic = getString(body, "topic") || "general";
  const message = getString(body, "message");
  const website = getString(body, "website");
  const contactElapsedMs = getString(body, "contactElapsedMs");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  if (
    name.length > 120 ||
    email.length > 254 ||
    company.length > 160 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { error: "One or more fields is too long" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  if (!VALID_TOPICS.has(topic)) {
    return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
  }

  const spamReasons = getSpamReasons(req, {
    contactElapsedMs,
    message,
    website,
  });

  if (spamReasons.length > 0) {
    console.warn("Sift contact form spam rejected:", spamReasons.join(", "));
    return acceptedResponse(req, isJsonRequest);
  }

  const clientIp = getClientIp(req);
  const rateLimited =
    isRateLimited(`contact:ip:${clientIp}`, 5, 10 * 60 * 1000) ||
    isRateLimited(`contact:email:${email}`, 3, 60 * 60 * 1000);

  if (rateLimited) {
    return NextResponse.json(
      { error: "Too many contact attempts. Please try again later." },
      { status: 429 }
    );
  }

  if (!RESEND_KEY) {
    console.warn("Sift contact form: RESEND key not configured");
    return NextResponse.redirect(new URL("/contact/thanks", req.url), 303);
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Topic: ${topic}`,
    "",
    "Message:",
    message,
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sift <noreply@siftforms.com>",
      to: NOTIFY_EMAIL,
      reply_to: email,
      subject: `[Sift] ${topic}: ${name}${company ? ` — ${company}` : ""}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Sift contact form Resend error:", res.status, txt);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact/thanks", req.url), 303);
}

function getString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSpamReasons(
  req: NextRequest,
  fields: {
    contactElapsedMs: string;
    message: string;
    website: string;
  }
): string[] {
  const reasons: string[] = [];

  if (fields.website) {
    reasons.push("honeypot");
  }

  if (!fields.contactElapsedMs) {
    reasons.push("missing_timer");
  } else {
    const elapsed = Number(fields.contactElapsedMs);

    if (!Number.isFinite(elapsed) || elapsed < 0) {
      reasons.push("missing_timer");
    } else if (elapsed < MIN_SUBMIT_TIME_MS) {
      reasons.push("too_fast");
    }
  }

  if (!req.headers.get("user-agent")) {
    reasons.push("missing_user_agent");
  }

  if (hasBadOrigin(req)) {
    reasons.push("bad_origin");
  }

  const linkCount = (fields.message.match(/https?:\/\/|www\./gi) || []).length;
  if (linkCount > 2) {
    reasons.push("too_many_links");
  }

  if (/(.)\1{40,}/.test(fields.message)) {
    reasons.push("repeated_character_run");
  }

  return reasons;
}

function hasBadOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin !== new URL(req.url).origin;
  } catch {
    return true;
  }
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    firstForwardedIp ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    pruneRateLimitStore(now);
    return false;
  }

  existing.count += 1;
  return existing.count > maxRequests;
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < MAX_RATE_LIMIT_ENTRIES) return;

  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (oldestKey) rateLimitStore.delete(oldestKey);
  }
}

function acceptedResponse(req: NextRequest, isJsonRequest: boolean) {
  if (isJsonRequest) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/contact/thanks", req.url), 303);
}
