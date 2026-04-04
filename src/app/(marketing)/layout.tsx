import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-polar">
      <header className="border-b border-border bg-ice">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]"
            >
              sift
            </Link>
            <nav className="hidden items-center gap-6 sm:flex">
              <Link
                href="/pricing"
                className="text-sm text-slate-muted hover:text-graphite"
              >
                Pricing
              </Link>
              <Link
                href="/docs/api"
                className="text-sm text-slate-muted hover:text-graphite"
              >
                API Docs
              </Link>
              <Link
                href="/docs/widget"
                className="text-sm text-slate-muted hover:text-graphite"
              >
                Widget
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-muted hover:text-graphite"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-border bg-ice py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-lg font-black tracking-tight text-graphite/30 font-[family-name:var(--font-heading)]">
              sift
            </span>
            <nav className="flex gap-6 text-sm text-slate-muted">
              <Link href="/pricing" className="hover:text-graphite">
                Pricing
              </Link>
              <Link href="/docs/api" className="hover:text-graphite">
                API
              </Link>
              <Link href="/docs/widget" className="hover:text-graphite">
                Widget
              </Link>
            </nav>
            <p className="text-xs text-slate-muted">
              &copy; {new Date().getFullYear()} Sift
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
