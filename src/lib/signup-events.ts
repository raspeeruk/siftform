const RESEND_KEY = process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.SIGNUP_NOTIFY_EMAIL || "andrew@twocores.com";
const MAILERLITE_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

/**
 * Fired once per new account (NextAuth createUser event). Both calls are
 * best-effort: a failure here must never block the signup itself.
 */
export async function onUserSignup(email: string, name?: string | null) {
  const results = await Promise.allSettled([
    notifySignup(email, name),
    addToMailerLite(email, name),
  ]);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("Sift signup event error:", r.reason);
    }
  }
}

async function notifySignup(email: string, name?: string | null) {
  if (!RESEND_KEY) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sift <noreply@siftforms.com>",
      to: NOTIFY_EMAIL,
      subject: `[Sift] New signup: ${email}`,
      text: [
        `New SiftForms account created.`,
        ``,
        `Email: ${email}`,
        name ? `Name: ${name}` : null,
        ``,
        `They start on the free tier with 0 schemas. Activation is the goal:`,
        `first schema created, then first submission.`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) {
    console.error("Sift signup notify failed:", res.status, await res.text());
  }
}

async function addToMailerLite(email: string, name?: string | null) {
  if (!MAILERLITE_KEY || !MAILERLITE_GROUP_ID) return;
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERLITE_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      status: "active",
      ...(name ? { fields: { name } } : {}),
      groups: [MAILERLITE_GROUP_ID],
    }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) {
    console.error("Sift MailerLite sync failed:", res.status, await res.text());
  }
}
