"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  // If a paid plan was selected, after auth redirect to billing with auto-checkout
  const callbackUrl =
    plan && ["starter", "growth", "scale"].includes(plan)
      ? `/dashboard/billing?checkout=${plan}`
      : "/dashboard";

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("resend", { email, callbackUrl });
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-polar">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-ice p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            sift
          </h1>
          <p className="mt-2 text-sm text-slate-muted">
            Turn unstructured text into structured data
          </p>
        </div>

        {sent ? (
          <div className="rounded-md border border-signal-light bg-signal-light/30 p-4 text-center">
            <p className="text-sm font-medium text-signal-dark">
              Check your email for a sign-in link
            </p>
            <p className="mt-1 text-xs text-slate-muted">
              We sent a magic link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleMagicLink} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-graphite placeholder:text-slate-muted/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-white transition hover:bg-signal-dark disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send magic link"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
