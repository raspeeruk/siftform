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

      const orgName = user.email.split("@")[0] + "'s Organization";
      const [org] = await db
        .insert(organizations)
        .values({ name: orgName })
        .returning();

      await db
        .update(users)
        .set({ organizationId: org.id, role: "owner" })
        .where(eq(users.id, user.id));
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
