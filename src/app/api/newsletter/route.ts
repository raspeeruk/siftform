import { NextRequest, NextResponse } from "next/server";

const COLLECTOR_URL = "https://rogerson-signups.netlify.app/";
const SITE = "siftforms.com";
const MAX_BODY_BYTES = 5_000;

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request is too large" }, { status: 413 });
  }

  const contentType = req.headers.get("content-type") || "";
  let body: Record<string, unknown> = {};

  try {
    if (contentType.includes("application/json")) {
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

  const email = getString(body, "email").toLowerCase();
  const website = getString(body, "website");

  // Honeypot filled means a bot. Pretend success and drop it.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!email || email.length > 254 || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(COLLECTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "newsletter",
        email,
        site: SITE,
        source: "footer",
      }).toString(),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.error("Sift newsletter collector error:", res.status);
      return NextResponse.json(
        { error: "Could not subscribe right now" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Sift newsletter collector request failed:", error);
    return NextResponse.json(
      { error: "Could not subscribe right now" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
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
