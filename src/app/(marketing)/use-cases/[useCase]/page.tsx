import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { useCases } from "@/lib/pseo/use-cases";
import { pseoTemplates } from "@/lib/pseo/templates";
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

type Props = { params: Promise<{ useCase: string }> };

export async function generateStaticParams() {
  return useCases.map((u) => ({ useCase: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { useCase: slug } = await params;
  const uc = useCases.find((u) => u.slug === slug);
  if (!uc) return {};
  return createMetadata({
    title: uc.headline,
    description: uc.description,
    path: `/use-cases/${slug}`,
  });
}

export default async function UseCasePage({ params }: Props) {
  const { useCase: slug } = await params;
  const uc = useCases.find((u) => u.slug === slug);
  if (!uc) notFound();

  const relatedTemplateData = pseoTemplates
    .filter((t) => uc.relatedTemplates.includes(t.slug))
    .slice(0, 3);
  const relatedUseCaseData = useCases
    .filter((u) => uc.relatedUseCases.includes(u.slug) && u.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(uc.faqs),
            breadcrumbJsonLd([
              { name: "Use Cases", href: "/use-cases/support-tickets" },
              { name: uc.name, href: `/use-cases/${slug}` },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Use Cases", href: "/use-cases/support-tickets" },
              { label: uc.name },
            ]}
          />

          <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            {uc.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            {uc.description}
          </p>

          {/* Problem / Solution */}
          <section className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-alert/20 bg-alert/5 p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-alert">
                The problem
              </h2>
              <p className="text-sm text-graphite">{uc.problem}</p>
            </div>
            <div className="rounded-lg border border-verified/20 bg-verified/5 p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-verified">
                The solution
              </h2>
              <p className="text-sm text-graphite">{uc.solution}</p>
            </div>
          </section>

          {/* Extraction demo */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              See the extraction
            </h2>
            <ExtractionDemo
              inputText={uc.exampleInput}
              outputFields={uc.exampleOutput}
            />
          </section>

          {/* Benefits */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Why teams switch to Sift
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {uc.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-lg border border-border bg-ice p-5"
                >
                  <h3 className="text-sm font-bold text-graphite">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-muted">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ROI */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              The numbers
            </h2>
            <div className="flex flex-wrap gap-6">
              {uc.roiStats.map((s) => (
                <div key={s.metric} className="rounded-lg border border-border bg-ice px-5 py-4">
                  <p className="text-2xl font-black text-signal font-[family-name:var(--font-heading)]">
                    {s.value}
                  </p>
                  <p className="text-sm font-medium text-graphite">
                    {s.metric}
                  </p>
                  <p className="text-xs text-slate-muted">{s.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Schema preview */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Recommended fields
            </h2>
            <SchemaPreview
              fields={uc.recommendedFields.map((f) => ({ ...f, why: undefined }))}
            />
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <FAQSection faqs={uc.faqs} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Start extracting {uc.name.toLowerCase()} data today
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Set up in under 5 minutes. No credit card required.
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
