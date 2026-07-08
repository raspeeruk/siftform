import { NextRequest, NextResponse } from "next/server";
import { handlers } from "@/lib/auth";

// Bot friction for the sign-in request itself, on top of the click-to-verify
// interstitial in src/lib/auth/index.ts / src/app/login/confirm. That fix
// stops a mail scanner's prefetch from completing a sign-in; this stops a
// bot from mass-submitting harvested addresses to /login in the first
// place, the same way src/app/api/contact/route.ts guards the contact form:
// a honeypot field, a minimum human-plausible submit time, and a light
// IP + email rate limit.
const SIGNIN_PATH_SUFFIX = "/signin/resend";
const MIN_SUBMIT_TIME_MS = 1_000;
const MAX_RATE_LIMIT_ENTRIES = 1_000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export const { GET } = handlers;

export async function POST(req: NextRequest) {
  if (!req.nextUrl.pathname.endsWith(SIGNIN_PATH_SUFFIX)) {
    return handlers.POST(req);
  }

  const guard = await evaluateSignInAttempt(req);
  if (guard.blocked) {
    console.warn("Sift login guard rejected sign-in attempt:", guard.reason);
    return fakeAcceptedResponse(req);
  }

  return handlers.POST(req);
}

async function evaluateSignInAttempt(
  req: NextRequest
): Promise<{ blocked: false } | { blocked: true; reason: string }> {
  let email = "";
  let website = "";
  let loginElapsedMs = "";

  try {
    // Read the body from a clone so the original request stream is still
    // intact for the real NextAuth handler when a request passes.
    const form = await req.clone().formData();
    email = String(form.get("email") || "").trim().toLowerCase();
    website = String(form.get("website") || "").trim();
    loginElapsedMs = String(form.get("loginElapsedMs") || "").trim();
  } catch {
    return { blocked: true, reason: "unparseable_body" };
  }

  if (website) {
    return { blocked: true, reason: "honeypot" };
  }

  if (!loginElapsedMs) {
    return { blocked: true, reason: "missing_timer" };
  }

  const elapsed = Number(loginElapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < 0 || elapsed < MIN_SUBMIT_TIME_MS) {
    return { blocked: true, reason: "too_fast" };
  }

  if (!req.headers.get("user-agent")) {
    return { blocked: true, reason: "missing_user_agent" };
  }

  const clientIp = getClientIp(req);
  const rateLimited =
    isRateLimited(`login:ip:${clientIp}`, 5, 10 * 60 * 1000) ||
    (!!email && isRateLimited(`login:email:${email}`, 3, 60 * 60 * 1000));

  if (rateLimited) {
    return { blocked: true, reason: "rate_limited" };
  }

  return { blocked: false };
}

// Mirrors the JSON shape NextAuth's own signin/resend endpoint returns on
// success (a { url } payload the client's fetch-based signIn() follows),
// so a rejected attempt is indistinguishable from a real one and a
// false-positive human still lands on the normal "check your email"
// screen. No token is created and no email goes out for a blocked request.
function fakeAcceptedResponse(req: NextRequest) {
  const url = new URL("/api/auth/verify-request", req.nextUrl.origin);
  url.searchParams.set("provider", "resend");
  url.searchParams.set("type", "email");
  return NextResponse.json({ url: url.toString() });
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
