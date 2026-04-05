import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { competitors } from "@/lib/pseo/competitors";
import { FeatureComparisonTable } from "@/components/pseo/feature-comparison-table";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import {
  createMetadata,
  faqJsonLd,
  comparisonJsonLd,
  breadcrumbJsonLd,
} from "@/lib/pseo/metadata";

type Props = { params: Promise<{ slug: string }> };

function findCompetitor(slug: string) {
  const prefix = "sift-vs-";
  const competitorSlug = slug.startsWith(prefix)
    ? slug.slice(prefix.length)
    : slug;
  return competitors.find((c) => c.slug === competitorSlug);
}

export async function generateStaticParams() {
  return competitors.map((c) => ({ slug: `sift-vs-${c.slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = findCompetitor(slug);
  if (!comp) return {};
  return createMetadata({
    title: `Sift vs ${comp.name}`,
    description: `Compare Sift and ${comp.name}. See how AI text extraction compares to traditional form builders for data collection.`,
    path: `/compare/sift-vs-${comp.slug}`,
  });
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const comp = findCompetitor(slug);
  if (!comp) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            comparisonJsonLd({
              siftName: "Sift",
              competitorName: comp.name,
            }),
            faqJsonLd(comp.faqs),
            breadcrumbJsonLd([
              { name: "Compare", href: `/compare/sift-vs-${comp.slug}` },
              {
                name: `Sift vs ${comp.name}`,
                href: `/compare/sift-vs-${comp.slug}`,
              },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Compare" },
              { label: `Sift vs ${comp.name}` },
            ]}
          />

          <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            Sift vs {comp.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            {comp.name} is a {comp.paradigm.replace("-", " ")}. Sift takes a
            different approach: instead of building forms with fields, users
            write naturally and AI extracts the data.
          </p>

          {/* Paradigm shift */}
          <section className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-ice p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-muted">
                {comp.name} approach
              </h2>
              <p className="text-sm text-graphite">
                Build a form with individual fields. Users fill in each one
                manually. Longer forms mean more drop-offs.
              </p>
            </div>
            <div className="rounded-lg border border-signal/20 bg-signal-light/10 p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-signal">
                Sift approach
              </h2>
              <p className="text-sm text-graphite">
                Users describe their situation in one text block. AI extracts
                all fields at once — name, email, issue type, urgency,
                everything.
              </p>
            </div>
          </section>

          {/* Feature comparison */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Feature comparison
            </h2>
            <FeatureComparisonTable
              competitorName={comp.name}
              features={comp.features}
            />
          </section>

          {/* Pricing */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Pricing comparison
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-signal/20 bg-signal-light/10 p-5">
                <p className="text-sm font-bold text-signal">Sift</p>
                <p className="mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)]">
                  From $29/mo
                </p>
                <p className="text-sm text-slate-muted">
                  500 AI extractions included
                </p>
              </div>
              <div className="rounded-lg border border-border bg-ice p-5">
                <p className="text-sm font-bold text-graphite">{comp.name}</p>
                <p className="mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)]">
                  {comp.pricing}
                </p>
                <p className="text-sm text-slate-muted">{comp.description}</p>
              </div>
            </div>
          </section>

          {/* Advantages */}
          <section className="mt-12 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                Why choose Sift
              </h2>
              <ul className="space-y-2">
                {comp.siftAdvantages.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-graphite">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                Why choose {comp.name}
              </h2>
              <ul className="space-y-2">
                {comp.competitorAdvantages.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-graphite">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Best for */}
          <section className="mt-12 rounded-lg border border-border bg-ice p-6">
            <h2 className="mb-2 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
              When {comp.name} is the better choice
            </h2>
            <p className="text-sm text-slate-muted">{comp.bestFor}</p>
          </section>

          {/* Switch reason */}
          <section className="mt-8 rounded-lg border border-signal/20 bg-signal-light/10 p-6">
            <h2 className="mb-2 text-lg font-bold text-signal font-[family-name:var(--font-heading)]">
              The key reason teams switch to Sift
            </h2>
            <p className="text-sm text-graphite">{comp.switchReason}</p>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <FAQSection faqs={comp.faqs} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Try the AI-first approach
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              See why teams are switching from traditional form builders to AI
              extraction.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start extracting data — free
            </Link>
          </section>

          {/* Other comparisons */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-4 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
              Other comparisons
            </h2>
            <div className="flex flex-wrap gap-2">
              {competitors
                .filter((c) => c.slug !== comp.slug)
                .slice(0, 6)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/sift-vs-${c.slug}`}
                    className="rounded-full border border-border bg-ice px-3 py-1 text-sm text-slate-muted hover:text-graphite"
                  >
                    vs {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
