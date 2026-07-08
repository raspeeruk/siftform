import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";
import { createDb } from "@/lib/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  organizations,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { onUserSignup } from "@/lib/signup-events";

const RESEND_KEY = process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY;

function getAdapter() {
  const db = createDb();
  return DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: {
    // Lazy adapter — only connects to DB when actually called
    get createUser() {
      return getAdapter().createUser;
    },
    get getUser() {
      return getAdapter().getUser;
    },
    get getUserByEmail() {
      return getAdapter().getUserByEmail;
    },
    get getUserByAccount() {
      return getAdapter().getUserByAccount;
    },
    get updateUser() {
      return getAdapter().updateUser;
    },
    get deleteUser() {
      return getAdapter().deleteUser;
    },
    get linkAccount() {
      return getAdapter().linkAccount;
    },
    get unlinkAccount() {
      return getAdapter().unlinkAccount;
    },
    get createSession() {
      return getAdapter().createSession;
    },
    get getSessionAndUser() {
      return getAdapter().getSessionAndUser;
    },
    get updateSession() {
      return getAdapter().updateSession;
    },
    get deleteSession() {
      return getAdapter().deleteSession;
    },
    get createVerificationToken() {
      return getAdapter().createVerificationToken;
    },
    get useVerificationToken() {
      return getAdapter().useVerificationToken;
    },
  },
  providers: [
    Resend({
      from: "Sift <noreply@siftforms.com>",
      // Custom sender: mail the user a link to /login/confirm instead of
      // the raw NextAuth callback URL.
      //
      // Why: NextAuth's email provider consumes the sign-in token and
      // creates a session on a bare GET to the callback URL. Corporate mail
      // security scanners (Microsoft SafeLinks, Proofpoint, Mimecast, etc.)
      // pre-fetch every link in an inbound email with exactly that kind of
      // GET request, before the real mailbox owner ever opens the message.
      // A scanner's prefetch alone was enough to mint a real session for
      // whoever the token was addressed to, which is how bots were turning
      // harvested corporate addresses into real accounts.
      //
      // Fix: the emailed link now points at /login/confirm, an inert page
      // that only ever renders HTML on GET. The real callback URL is
      // embedded in that page's client state, not in a static href a
      // crawler can follow, and it is only navigated to from a click
      // handler that runs after a genuine user gesture. Scanners fetch and
      // stop; they do not execute JavaScript or simulate clicks, so this
      // path never reaches the token-consuming endpoint. A real user sees
      // one extra "Confirm sign-in" click and then signs in normally.
      async sendVerificationRequest({ identifier: to, url, provider }) {
        if (!RESEND_KEY) {
          throw new Error("Resend API key is not configured");
        }

        const callbackUrl = new URL(url);
        const confirmUrl = new URL("/login/confirm", callbackUrl.origin);
        confirmUrl.searchParams.set("next", callbackUrl.toString());

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to,
            subject: "Sign in to Sift",
            html: confirmSignInEmailHtml(confirmUrl.toString()),
            text: confirmSignInEmailText(confirmUrl.toString()),
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          throw new Error("Resend error: " + errBody);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  events: {
    async createUser({ user }) {
      if (!user.id || !user.email) return;
      const db = createDb();

      // Auto-upgrade admin accounts
      const ADMIN_EMAILS: Record<string, { plan: string; limit: number }> = {
        "speer.ra@gmail.com": { plan: "growth", limit: 2000 },
      };
      const adminConfig = ADMIN_EMAILS[user.email];

      const orgName = user.email.split("@")[0] + "'s Organization";
      const [org] = await db
        .insert(organizations)
        .values({
          name: orgName,
          ...(adminConfig
            ? {
                plan: adminConfig.plan,
                extractionsLimit: adminConfig.limit,
              }
            : {}),
        })
        .returning();

      await db
        .update(users)
        .set({ organizationId: org.id, role: "owner" })
        .where(eq(users.id, user.id));

      if (!adminConfig) {
        try {
          await onUserSignup(user.email, user.name);
        } catch (err) {
          console.error("Sift signup event error:", err);
        }
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const db = createDb();
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, user.id),
          with: { organization: true },
        });
        if (dbUser?.organization) {
          (session as any).organizationId = dbUser.organization.id;
          (session as any).organizationName = dbUser.organization.name;
          (session as any).plan = dbUser.organization.plan;
        }
      }
      return session;
    },
  },
});

function confirmSignInEmailHtml(confirmUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <p style="font-size: 20px; font-weight: 700; margin: 0 0 24px;">sift</p>
      <h1 style="font-size: 18px; margin: 0 0 12px;">Sign in to Sift</h1>
      <p style="font-size: 14px; line-height: 1.6; color: #444; margin: 0 0 24px;">
        Click the button below to finish signing in. The link is valid for a limited time and can only be used once.
      </p>
      <a href="${confirmUrl}" style="display: inline-block; background: #111; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">
        Confirm sign-in
      </a>
      <p style="font-size: 12px; color: #888; margin: 24px 0 0;">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>
  `;
}

function confirmSignInEmailText(confirmUrl: string): string {
  return [
    "Sign in to Sift",
    "",
    `Open this link to finish signing in: ${confirmUrl}`,
    "",
    "The link is valid for a limited time and can only be used once. If you did not request this, you can safely ignore this email.",
  ].join("\n");
}
