import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { industries } from "@/lib/pseo/industries";
import { pseoTemplates } from "@/lib/pseo/templates";
import { useCases } from "@/lib/pseo/use-cases";
import { ExtractionDemo } from "@/components/pseo/extraction-demo";
import { SchemaPreview } from "@/components/pseo/schema-preview";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import { RelatedPages } from "@/components/pseo/related-pages";
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/pseo/metadata";

type Props = { params: Promise<{ industry: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return createMetadata({
    title: `Sift for ${industry.name}`,
    description: industry.description,
    path: `/for/${slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relatedTemplateData = pseoTemplates
    .filter((t) => industry.relatedTemplates.includes(t.slug))
    .slice(0, 3);
  const relatedUseCaseData = useCases
    .filter((u) => industry.relatedUseCases.includes(u.slug))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(industry.faqs),
            breadcrumbJsonLd([
              { name: "Industries", href: "/for/law-firms" },
              { name: industry.name, href: `/for/${slug}` },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Industries", href: "/for/law-firms" },
              { label: industry.name },
            ]}
          />

          <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            {industry.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            {industry.description}
          </p>

          {/* Stats */}
          {industry.stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-6">
              {industry.stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-ice px-5 py-4">
                  <p className="text-2xl font-black text-signal font-[family-name:var(--font-heading)]">
                    {s.value}
                  </p>
                  <p className="text-xs text-slate-muted">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Pain points */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              The intake problem in {industry.name.toLowerCase()}
            </h2>
            <ul className="space-y-3">
              {industry.painPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-alert"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span className="text-graphite">{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Extraction demo */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              See how Sift handles {industry.name.toLowerCase()} intake
            </h2>
            <ExtractionDemo
              inputText={industry.exampleInput}
              outputFields={industry.exampleOutput}
            />
          </section>

          {/* Recommended schema */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Recommended form fields for {industry.name.toLowerCase()}
            </h2>
            <SchemaPreview fields={industry.recommendedFields} />
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <FAQSection faqs={industry.faqs} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Ready to modernise your {industry.name.toLowerCase()} intake?
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Set up your first extraction form in under 5 minutes.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start extracting data — free
            </Link>
          </section>

          {/* Related */}
          <RelatedPages
            templates={relatedTemplateData.map((t) => ({
              href: `/templates/${t.slug}`,
              label: t.name,
              description: t.description,
            }))}
            useCases={relatedUseCaseData.map((u) => ({
              href: `/use-cases/${u.slug}`,
              label: u.name,
              description: u.description,
            }))}
          />
        </div>
      </main>
    </>
  );
}
