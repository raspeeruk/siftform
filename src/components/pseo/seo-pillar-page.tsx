import Link from "next/link";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import type { SeoPillar } from "@/lib/pseo/pillars";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/pseo/metadata";

export function SeoPillarPage({ pillar }: { pillar: SeoPillar }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(pillar.faqs),
            breadcrumbJsonLd([
              { name: pillar.eyebrow, href: `/${pillar.slug}` },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Breadcrumbs items={[{ label: pillar.eyebrow }]} />

          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal">
            {pillar.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
            {pillar.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-muted">
            {pillar.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-md bg-signal px-6 py-3 text-center text-sm font-medium text-white shadow-sm hover:bg-signal-dark"
            >
              Start free
            </Link>
            <Link
              href="/templates"
              className="rounded-md border border-border bg-ice px-6 py-3 text-center text-sm font-medium text-graphite hover:bg-polar"
            >
              Browse templates
            </Link>
          </div>

          <section className="mt-12 grid gap-4 sm:grid-cols-3">
            {pillar.proofPoints.map((point) => (
              <div key={point.label} className="border border-border bg-ice p-5">
                <p className="text-2xl font-black text-signal font-[family-name:var(--font-heading)]">
                  {point.metric}
                </p>
                <p className="mt-1 text-sm text-slate-muted">{point.label}</p>
              </div>
            ))}
          </section>

          <section className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              {pillar.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-muted">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <aside className="h-fit border border-border bg-ice p-6">
              <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                Common use cases
              </h2>
              <ul className="mt-4 space-y-3">
                {pillar.useCases.map((useCase) => (
                  <li key={useCase} className="flex gap-3 text-sm text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mt-14 border-t border-border pt-12">
            <h2 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              How it works
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {pillar.workflow.map((step, index) => (
                <div key={step.title} className="border border-border bg-white p-5">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-signal">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-graphite">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-12">
            <h2 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FAQSection faqs={pillar.faqs} />
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-12">
            <h2 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Related pages
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {pillar.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-border bg-ice p-5 transition hover:border-signal"
                >
                  <h3 className="text-sm font-bold text-graphite">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 border border-signal/20 bg-signal-light/10 p-8 text-center">
            <h2 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Build your first AI intake form
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-muted">
              Start with a template, define your extraction fields, and embed
              Sift Forms on your site in minutes.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-md bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Start extracting data
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
