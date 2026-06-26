import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";
import { industries } from "@/lib/pseo/industries";

export const metadata: Metadata = createMetadata({
  title: "AI Intake Forms by Industry",
  description:
    "See how Sift Forms turns free-text intake into structured data for legal, healthcare, insurance, real estate, education, support, and more.",
  path: "/for",
});

export default function IndustriesIndexPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: "Industries" }]} />

        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal">
          Industries
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          AI intake forms for teams with messy real-world requests
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-muted">
          Sift Forms extracts structured data from free-text submissions across
          intake-heavy workflows. Pick an industry to see example inputs,
          recommended fields, and routing ideas.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/for/${industry.slug}`}
              className="border border-border bg-ice p-6 transition hover:border-signal"
            >
              <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                {industry.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                {industry.description}
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-signal">
                View industry guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
