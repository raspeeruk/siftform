import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { pseoTemplates } from "@/lib/pseo/templates";
import { ExtractionDemo } from "@/components/pseo/extraction-demo";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { RelatedPages } from "@/components/pseo/related-pages";
import { createMetadata, breadcrumbJsonLd } from "@/lib/pseo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return pseoTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = pseoTemplates.find((t) => t.slug === slug);
  if (!template) return {};
  return createMetadata({
    title: `${template.name} Template`,
    description: template.longDescription.slice(0, 160),
    path: `/templates/${slug}`,
  });
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = pseoTemplates.find((t) => t.slug === slug);
  if (!template) notFound();

  const related = pseoTemplates
    .filter((t) => t.category === template.category && t.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Templates", href: "/templates" },
              { name: template.name, href: `/templates/${slug}` },
            ])
          ),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Templates", href: "/templates" },
              { label: template.name },
            ]}
          />

          <span className="mb-3 inline-block rounded bg-signal-light/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-signal">
            {template.category}
          </span>
          <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            {template.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            {template.longDescription}
          </p>

          {/* Extraction demo */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              See it in action
            </h2>
            <ExtractionDemo
              inputText={template.exampleInput}
              outputFields={template.exampleOutput}
            />
          </section>

          {/* Fields */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Extracted fields
            </h2>
            <div className="rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-polar/50">
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      Field
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      Type
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {template.fields.map((f, i) => (
                    <tr
                      key={f.name}
                      className={`border-b border-border ${
                        i % 2 === 0 ? "bg-ice" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-graphite">
                          {f.label}
                        </span>
                        {f.description && (
                          <p className="text-xs text-slate-muted">
                            {f.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                        {f.type}
                      </td>
                      <td className="px-4 py-3">
                        {f.required ? (
                          <span className="text-xs font-medium text-signal">
                            Required
                          </span>
                        ) : (
                          <span className="text-xs text-slate-muted">
                            Optional
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Use this template
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Sign up and select &ldquo;{template.name}&rdquo; from the template
              gallery. Customise any field before going live.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start with this template — free
            </Link>
          </section>

          {/* Related templates */}
          <RelatedPages
            templates={related.map((t) => ({
              href: `/templates/${t.slug}`,
              label: t.name,
              description: t.description,
            }))}
          />
        </div>
      </main>
    </>
  );
}
