"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// This page is what the magic-link email actually points at (see
// sendVerificationRequest in src/lib/auth/index.ts). A bare GET here must
// never sign anyone in: mail security scanners (SafeLinks, Proofpoint,
// Mimecast, etc.) fetch every link in an inbound email to check for
// malware, and that fetch is indistinguishable from a real visit at the
// HTTP level. So this page renders as inert HTML on load, no matter who
// or what requests it.
//
// The real NextAuth callback URL (the one that actually consumes the
// token and creates the session) is never present as a static href in the
// rendered markup. It only exists in client-side state, computed after
// mount, and is only navigated to from a button's onClick handler, i.e.
// after a genuine user gesture. Scanners fetch and stop: they don't
// execute JavaScript, and even the ones that do generally don't simulate
// clicks. A real person clicks once and completes sign-in as normal.
export default function ConfirmSignInPage() {
  return (
    <Suspense>
      <ConfirmSignInForm />
    </Suspense>
  );
}

type LinkCheck = { checked: false; targetUrl: null } | { checked: true; targetUrl: string | null };

function ConfirmSignInForm() {
  const searchParams = useSearchParams();
  const [link, setLink] = useState<LinkCheck>({ checked: false, targetUrl: null });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { checked, targetUrl } = link;

  // resolveSafeCallbackUrl reads window.location, which does not exist
  // during server rendering. This is a read of a browser-only external
  // API on mount, not derived state that could be computed during render,
  // so it belongs in an effect.
  useEffect(() => {
    const next = searchParams.get("next");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLink({ checked: true, targetUrl: next ? resolveSafeCallbackUrl(next) : null });
  }, [searchParams]);

  function handleConfirm() {
    if (!targetUrl) return;
    setStatus("loading");
    // Full-page navigation triggered by a real click. This is the only
    // place in the flow that reaches the token-consuming callback URL.
    window.location.href = targetUrl;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-polar">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-ice p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-graphite font-[family-name:var(--font-heading)]">
          Confirm sign-in
        </h1>

        {!checked ? null : targetUrl ? (
          <>
            <p className="text-sm text-slate-muted">
              Click below to finish signing in to Sift.
            </p>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={status === "loading"}
              className="w-full rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-white transition hover:bg-signal-dark disabled:opacity-50"
            >
              {status === "loading" ? "Signing in..." : "Confirm sign-in"}
            </button>
          </>
        ) : (
          <p className="text-sm text-slate-muted">
            This sign-in link is invalid or has expired.{" "}
            <a href="/login" className="text-signal hover:underline">
              Request a new one
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}

// Only ever return a same-origin NextAuth callback URL. This keeps the
// confirm page from doubling as an open redirect even if the "next" value
// were ever tampered with or malformed.
function resolveSafeCallbackUrl(next: string): string | null {
  try {
    const parsed = new URL(next, window.location.origin);
    const isSameOrigin = parsed.origin === window.location.origin;
    const isAuthCallback = parsed.pathname.startsWith("/api/auth/callback/");
    return isSameOrigin && isAuthCallback ? parsed.toString() : null;
  } catch {
    return null;
  }
}
