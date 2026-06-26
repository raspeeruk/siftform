import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";
import { competitors } from "@/lib/pseo/competitors";

export const metadata: Metadata = createMetadata({
  title: "Sift Forms Comparisons",
  description:
    "Compare Sift Forms with Typeform, Jotform, Google Forms, Tally, Fillout, and other form builders for AI-first intake and extraction.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: "Compare" }]} />

        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal">
          Compare
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          Compare Sift Forms with traditional form builders
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-muted">
          Traditional form tools help you design fields. Sift Forms helps you
          extract structured data from natural-language submissions. Use these
          comparisons to decide which approach fits your workflow.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competitors.map((competitor) => (
            <Link
              key={competitor.slug}
              href={`/compare/sift-vs-${competitor.slug}`}
              className="border border-border bg-ice p-6 transition hover:border-signal"
            >
              <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                Sift Forms vs {competitor.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                {competitor.description}
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-signal">
                Read comparison &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
