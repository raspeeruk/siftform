export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-polar">
      <div className="w-full max-w-md rounded-lg border border-border bg-ice p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-graphite font-[family-name:var(--font-heading)]">
          Check your email
        </h1>
        <p className="mt-3 text-sm text-slate-muted">
          We sent you a magic link. Click it to sign in to Sift.
        </p>
        <p className="mt-6 text-xs text-slate-muted">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <a href="/login" className="text-signal hover:underline">
            try again
          </a>
          .
        </p>
      </div>
    </div>
  );
}
