"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const orgName = (session as any)?.organizationName || "My Organization";
  const [name, setName] = useState(orgName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = name !== orgName;

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/dashboard/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setSaved(true);
      await update(); // refresh session with new org name
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white transition hover:bg-signal-dark disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saved && (
            <span className="text-sm text-verified">Saved</span>
          )}
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
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-muted">
            Plan
          </label>
          <p className="text-sm capitalize text-graphite">
            {(session as any)?.plan || "free"}
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
