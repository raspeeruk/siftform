import { NextRequest, NextResponse } from "next/server";

const RESEND_KEY = process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = "andrew@twocores.com";

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    body = await req.json();
  } else {
    const form = await req.formData();
    body = Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)])
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const topic = (body.topic || "general").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
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
