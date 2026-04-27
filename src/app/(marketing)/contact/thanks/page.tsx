import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message sent — Sift",
  description: "Thanks for getting in touch. We'll respond shortly.",
};

export default function ContactThanks() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal mb-3">
        Received
      </p>
      <h1 className="text-4xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
        Thanks — message received.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-muted">
        We&apos;ve got it. We&apos;ll respond within one business day, usually
        sooner.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-block bg-signal px-8 py-3 text-sm font-medium text-white hover:bg-signal/90 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
