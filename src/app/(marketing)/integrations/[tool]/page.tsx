import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { integrations } from "@/lib/pseo/integrations";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/pseo/metadata";

type Props = { params: Promise<{ tool: string }> };

export async function generateStaticParams() {
  return integrations.map((i) => ({ tool: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) return {};
  return createMetadata({
    title: `Sift + ${integration.name} Integration`,
    description: integration.description,
    path: `/integrations/${slug}`,
  });
}

export default async function IntegrationPage({ params }: Props) {
  const { tool: slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(integration.faqs),
            breadcrumbJsonLd([
              { name: "Integrations", href: "/integrations" },
              {
                name: integration.name,
                href: `/integrations/${slug}`,
              },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs
            items={[
              { label: "Integrations", href: "/integrations" },
              { label: integration.name },
            ]}
          />

          <div className="flex items-center gap-4">
            <span className="text-4xl">{integration.logo}</span>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
                Sift + {integration.name}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-slate-muted">
            {integration.headline}
          </p>

          {/* How it works */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              How it works
            </h2>
            <p className="text-sm text-slate-muted">{integration.howItWorks}</p>
          </section>

          {/* Setup steps */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Setup guide
            </h2>
            <div className="space-y-4">
              {integration.setupSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-border bg-ice p-5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-graphite">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data mapping */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Data mapping
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-polar/50">
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      Sift Field
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      {integration.name} Field
                    </th>
                    <th className="px-4 py-3 font-medium text-slate-muted">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {integration.dataMapping.map((m, i) => (
                    <tr
                      key={i}
                      className={`border-b border-border ${
                        i % 2 === 0 ? "bg-ice" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-graphite">
                        {m.siftField}
                      </td>
                      <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-graphite">
                        {m.targetField}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-muted">
                        {m.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Use cases */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Common use cases
            </h2>
            <ul className="space-y-2">
              {integration.useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-2 text-sm">
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
                  <span className="text-graphite">{uc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <FAQSection faqs={integration.faqs} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-lg border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Connect Sift to {integration.name}
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Set up in under 5 minutes with webhooks. No credit card required.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start extracting data — free
            </Link>
          </section>

          {/* Other integrations */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-4 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
              Other integrations
            </h2>
            <div className="flex flex-wrap gap-2">
              {integrations
                .filter((i) => i.slug !== slug)
                .slice(0, 8)
                .map((i) => (
                  <Link
                    key={i.slug}
                    href={`/integrations/${i.slug}`}
                    className="rounded-full border border-border bg-ice px-3 py-1 text-sm text-slate-muted hover:text-graphite"
                  >
                    {i.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
