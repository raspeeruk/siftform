import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { competitors } from "@/lib/pseo/competitors";
import { FeatureComparisonTable } from "@/components/pseo/feature-comparison-table";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/pseo/metadata";

type Props = { params: Promise<{ competitor: string }> };

export async function generateStaticParams() {
  return competitors.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comp = competitors.find((c) => c.slug === slug);
  if (!comp) return {};
  return createMetadata({
    title: `Best ${comp.name} Alternative`,
    description: `Looking for a ${comp.name} alternative? Sift replaces traditional forms with AI text extraction. Users write naturally, AI extracts the data.`,
    path: `/alternative/${slug}`,
  });
}

export default async function AlternativePage({ params }: Props) {
  const { competitor: slug } = await params;
  const comp = competitors.find((c) => c.slug === slug);
  if (!comp) notFound();

  const altFaqs = [
    {
      question: `Is Sift a direct ${comp.name} replacement?`,
      answer: `Sift takes a fundamentally different approach. Instead of building forms with fields, Sift lets users describe their situation in natural language and AI extracts the structured data. It's not a 1:1 replacement — it's a paradigm shift that often gets better completion rates and richer data.`,
    },
    {
      question: `Can I migrate my ${comp.name} forms to Sift?`,
      answer: `You don't migrate forms — you create extraction schemas. Define the fields you need (name, email, issue type, etc.) and Sift's AI will extract them from any text input. Most teams are up and running in under 10 minutes.`,
    },
    {
      question: "How accurate is the AI extraction?",
      answer:
        "Sift typically achieves 90-98% accuracy on structured fields like names, emails, and dates. Confidence scores are provided for every extracted field so you can flag low-confidence extractions for review.",
    },
    {
      question: `What does Sift cost compared to ${comp.name}?`,
      answer: `Sift starts at $29/month for 500 extractions. ${comp.name} starts at ${comp.pricing}. The pricing models are different — Sift charges per extraction rather than per form or per response.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(altFaqs),
            breadcrumbJsonLd([
              { name: "Alternatives", href: `/alternative/${slug}` },
              {
                name: `${comp.name} Alternative`,
                href: `/alternative/${slug}`,
              },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Alternatives" },
              { label: `${comp.name} Alternative` },
            ]}
          />

          <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            The best {comp.name} alternative
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            Looking for a {comp.name} alternative? Sift replaces traditional
            form builders with AI-powered text extraction. Users write
            naturally — Sift extracts the structured data you need.
          </p>

          {/* Why switch */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Why teams switch from {comp.name}
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-ice p-5">
                <h3 className="text-sm font-bold text-graphite">
                  No more form fatigue
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  Long forms kill completion rates. With Sift, users write one
                  paragraph and AI extracts all the fields you need. Higher
                  completion rates, richer data.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-ice p-5">
                <h3 className="text-sm font-bold text-graphite">
                  AI understands context
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  Traditional forms can&apos;t understand &ldquo;I was charged
                  twice yesterday&rdquo; — they need separate date and amount
                  fields. Sift&apos;s AI extracts meaning from natural language.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-ice p-5">
                <h3 className="text-sm font-bold text-graphite">
                  Works in 120+ languages
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  No need to build separate forms for each language. Sift&apos;s
                  AI extracts structured data regardless of the input language.
                </p>
              </div>
            </div>
          </section>

          {/* Feature comparison */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Sift vs {comp.name}: feature comparison
            </h2>
            <FeatureComparisonTable
              competitorName={comp.name}
              features={comp.features}
            />
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <FAQSection faqs={altFaqs} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Try Sift free
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Set up your first extraction schema in under 5 minutes. No credit
              card required.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start extracting data — free
            </Link>
          </section>

          {/* More comparisons */}
          <div className="mt-12">
            <Link
              href={`/compare/sift-vs-${comp.slug}`}
              className="text-sm font-medium text-signal hover:text-signal-dark"
            >
              See detailed Sift vs {comp.name} comparison &rarr;
            </Link>
          </div>

          {/* Other alternatives */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-4 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
              Other alternatives
            </h2>
            <div className="flex flex-wrap gap-2">
              {competitors
                .filter((c) => c.slug !== slug)
                .slice(0, 6)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/alternative/${c.slug}`}
                    className="rounded-full border border-border bg-ice px-3 py-1 text-sm text-slate-muted hover:text-graphite"
                  >
                    {c.name} alternative
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
