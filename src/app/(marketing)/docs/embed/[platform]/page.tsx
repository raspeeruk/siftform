import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { embedPlatforms } from "@/lib/pseo/embed-platforms";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { FAQSection } from "@/components/pseo/faq-section";
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/pseo/metadata";

type Props = { params: Promise<{ platform: string }> };

export async function generateStaticParams() {
  return embedPlatforms.map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = embedPlatforms.find((p) => p.slug === slug);
  if (!platform) return {};
  return createMetadata({
    title: `${platform.headline}`,
    description: platform.description,
    path: `/docs/embed/${slug}`,
  });
}

export default async function EmbedPlatformPage({ params }: Props) {
  const { platform: slug } = await params;
  const platform = embedPlatforms.find((p) => p.slug === slug);
  if (!platform) notFound();

  const related = embedPlatforms
    .filter((p) => platform.relatedPlatforms.includes(p.slug))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(platform.faqs),
            breadcrumbJsonLd([
              { name: "Docs", href: "/docs/widget" },
              { name: "Embed", href: "/docs/embed" },
              { name: platform.name, href: `/docs/embed/${slug}` },
            ]),
          ]),
        }}
      />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs
            items={[
              { label: "Docs", href: "/docs/widget" },
              { label: "Embed", href: "/docs/embed" },
              { label: platform.name },
            ]}
          />

          {/* Hero */}
          <div className="border-b border-border pb-8">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-muted">
              <span className="rounded-full bg-signal-light/20 px-2 py-0.5 text-signal">
                {platform.difficulty}
              </span>
              <span>•</span>
              <span>{platform.estimatedTime}</span>
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-graphite sm:text-4xl font-[family-name:var(--font-heading)]">
              {platform.headline}
            </h1>
            <p className="mt-3 text-base text-slate-muted">{platform.intro}</p>
          </div>

          {/* Pre-flight */}
          <div className="mt-8 rounded-md border border-signal/20 bg-signal-light/10 p-4 text-sm text-graphite">
            <strong>Before you start:</strong> grab your Form ID and public API
            key from your{" "}
            <Link
              href="/dashboard/schemas"
              className="text-signal hover:underline"
            >
              dashboard
            </Link>
            . You will replace{" "}
            <code className="rounded bg-polar px-1 py-0.5 font-[family-name:var(--font-mono)] text-xs">
              YOUR_FORM_ID
            </code>{" "}
            and{" "}
            <code className="rounded bg-polar px-1 py-0.5 font-[family-name:var(--font-mono)] text-xs">
              YOUR_PUBLIC_KEY
            </code>{" "}
            in the snippets below.
          </div>

          {/* Steps */}
          <Section title={`Install Sift on ${platform.name}`}>
            <ol className="space-y-4">
              {platform.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-signal bg-signal/10 text-sm font-bold text-signal">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-graphite">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Code language={platform.codeSnippet.language}>
              {platform.codeSnippet.code}
            </Code>
          </Section>

          {/* Alternative methods */}
          {platform.alternativeMethods &&
            platform.alternativeMethods.length > 0 && (
              <Section title="Alternative install methods">
                <div className="space-y-4">
                  {platform.alternativeMethods.map((method, i) => (
                    <div
                      key={i}
                      className="rounded-md border border-border bg-ice p-4"
                    >
                      <h3 className="font-semibold text-graphite">
                        {method.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-muted">
                        {method.description}
                      </p>
                      {method.code && (
                        <Code language="tsx">{method.code}</Code>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

          {/* Tips */}
          <Section title="Tips for the best results">
            <ul className="space-y-2 text-sm text-graphite">
              {platform.tips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Troubleshooting */}
          <Section title="Troubleshooting">
            <div className="space-y-4">
              {platform.troubleshooting.map((item, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border bg-polar p-4"
                >
                  <p className="text-sm font-semibold text-graphite">
                    {item.problem}
                  </p>
                  <p className="mt-1 text-sm text-slate-muted">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* FAQs */}
          <div className="mt-12">
            <FAQSection faqs={platform.faqs} />
          </div>

          {/* Related platforms */}
          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
                Embed Sift on other platforms
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/docs/embed/${p.slug}`}
                    className="rounded-md border border-border bg-ice p-4 transition hover:border-signal"
                  >
                    <p className="text-sm font-semibold text-graphite">
                      {p.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-muted line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-border bg-ice p-8 text-center">
            <h2 className="text-2xl font-bold text-graphite font-[family-name:var(--font-heading)]">
              Ready to embed Sift on {platform.name}?
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Create your first form in your dashboard, then come back and paste
              the snippet above.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                href="/login"
                className="rounded-md bg-signal px-6 py-2 text-sm font-medium text-white hover:bg-signal-dark"
              >
                Start free
              </Link>
              <Link
                href="/docs/embed"
                className="rounded-md border border-border bg-white px-6 py-2 text-sm font-medium text-graphite hover:bg-polar"
              >
                Browse all platforms
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 border-b border-border pb-8 last:border-b-0">
      <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Code({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between rounded-t-md border border-b-0 border-deep bg-deep/95 px-4 py-1.5 text-xs text-slate-muted">
        <span className="font-[family-name:var(--font-mono)]">{language}</span>
      </div>
      <pre className="overflow-x-auto rounded-b-md border border-deep bg-deep p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-green-400">
        {children}
      </pre>
    </div>
  );
}
