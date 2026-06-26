import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";
import { competitors } from "@/lib/pseo/competitors";

export const metadata: Metadata = createMetadata({
  title: "Form Builder Alternatives",
  description:
    "Find AI-first alternatives to Typeform, Jotform, Google Forms, Tally, Fillout, and other form builders for free-text intake.",
  path: "/alternatives",
});

export default function AlternativesIndexPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: "Alternatives" }]} />

        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal">
          Alternatives
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          AI-first alternatives to traditional form builders
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-muted">
          If your users need to explain complex requests, a longer form is not
          always the answer. Sift Forms lets users write naturally, then
          extracts the structured fields your team needs.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competitors.map((competitor) => (
            <Link
              key={competitor.slug}
              href={`/alternative/${competitor.slug}`}
              className="border border-border bg-ice p-6 transition hover:border-signal"
            >
              <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                {competitor.name} alternative
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                Learn when Sift Forms is a better fit than {competitor.name}
                for AI intake, free-text submissions, and structured extraction.
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-signal">
                View alternative &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
