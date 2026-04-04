import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-polar">
      {/* Nav */}
      <header className="border-b border-border bg-ice">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            sift
          </span>
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

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-signal">
            Forms are broken
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-graphite sm:text-6xl font-[family-name:var(--font-heading)]">
            Turn text into
            <br />
            <span className="text-signal">structured data</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-muted">
            Users describe their situation in plain English. AI extracts exactly
            the fields you need. Embed anywhere with one line of code.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="rounded-md bg-signal px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-signal-dark"
            >
              Start extracting data
            </Link>
            <Link
              href="#demo"
              className="rounded-md border border-border bg-ice px-6 py-3 text-sm font-medium text-graphite hover:bg-polar"
            >
              See it work
            </Link>
          </div>
        </div>

        {/* Visual: extraction example */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-8 sm:grid-cols-2">
          {/* Left: messy input */}
          <div className="rounded-lg border border-border bg-ice p-6 text-left">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
              What users type
            </p>
            <div className="rounded border border-border bg-white p-4 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-graphite">
              Hi, I&apos;m Sarah Chen and I need help with a billing issue. My
              account number is AC-2847 and I was charged $149.99 twice on March
              15th. My email is sarah.chen@gmail.com. This is really frustrating
              because I&apos;ve been a customer for 3 years.
            </div>
          </div>

          {/* Right: structured output */}
          <div className="rounded-lg border border-border bg-ice p-6 text-left">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
              What you get
            </p>
            <div className="space-y-2.5 rounded border border-border bg-white p-4">
              <ExtractedField label="Name" value="Sarah Chen" confidence={0.98} />
              <ExtractedField
                label="Email"
                value="sarah.chen@gmail.com"
                confidence={0.99}
              />
              <ExtractedField label="Account" value="AC-2847" confidence={0.95} />
              <ExtractedField label="Issue" value="Double charge" confidence={0.88} />
              <ExtractedField label="Amount" value="$149.99" confidence={0.96} />
              <ExtractedField label="Date" value="2024-03-15" confidence={0.92} />
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            Three steps. Five minutes.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Step
              number="01"
              title="Define your schema"
              description="Name, email, issue type — whatever fields matter to your business."
            />
            <Step
              number="02"
              title="Embed the widget"
              description="One script tag. Works on any website. Shadow DOM means zero style conflicts."
            />
            <Step
              number="03"
              title="Data flows in"
              description="Structured submissions land in your dashboard and fire webhooks to your systems."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-ice py-8 text-center text-sm text-slate-muted">
        <p>&copy; {new Date().getFullYear()} Sift. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ExtractedField({
  label,
  value,
  confidence,
}: {
  label: string;
  value: string;
  confidence: number;
}) {
  const color =
    confidence >= 0.9
      ? "bg-verified"
      : confidence >= 0.7
      ? "bg-extract"
      : "bg-alert";

  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <span className="text-xs font-medium text-slate-muted">{label}</span>
        <p className="font-[family-name:var(--font-mono)] text-sm text-graphite">
          {value}
        </p>
      </div>
      <span className="flex items-center gap-1">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />
        <span className="font-[family-name:var(--font-mono)] text-[10px] text-slate-muted">
          {(confidence * 100).toFixed(0)}%
        </span>
      </span>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-left">
      <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-signal/20">
        {number}
      </span>
      <h3 className="mt-2 text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-muted">{description}</p>
    </div>
  );
}
