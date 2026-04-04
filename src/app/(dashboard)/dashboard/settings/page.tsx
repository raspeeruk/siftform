"use client";

import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const orgName = (session as any)?.organizationName || "My Organization";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Settings
        </h1>
      </div>

      <div className="rounded-lg border border-border bg-ice p-6 space-y-4">
        <h2 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
          Organization
        </h2>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-muted">
            Organization Name
          </label>
          <input
            type="text"
            defaultValue={orgName}
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-ice p-6 space-y-4">
        <h2 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
          Account
        </h2>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-muted">
            Email
          </label>
          <p className="text-sm text-graphite">
            {session?.user?.email || "—"}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md border border-alert/30 px-4 py-2 text-sm font-medium text-alert hover:bg-alert/5"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
