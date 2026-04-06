import type { Metadata } from "next";
import Link from "next/link";
import { embedPlatforms } from "@/lib/pseo/embed-platforms";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Embed Guides — Install Sift on Any Platform",
  description:
    "Step-by-step install guides for embedding the Sift AI form widget on Shopify, WordPress, Webflow, Squarespace, Wix, React, Next.js, Framer, Ghost, and plain HTML.",
  path: "/docs/embed",
});

const CATEGORIES: {
  id: "ecommerce" | "cms" | "site-builder" | "framework" | "vanilla";
  label: string;
  description: string;
}[] = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    description:
      "Install Sift on storefronts to capture quote requests, custom orders, and lead intake.",
  },
  {
    id: "cms",
    label: "Content management systems",
    description:
      "Embed Sift on blog posts, pages, and members-only content.",
  },
  {
    id: "site-builder",
    label: "Site builders",
    description:
      "Drag-and-drop site builders with native embed components.",
  },
  {
    id: "framework",
    label: "Frameworks",
    description:
      "JavaScript frameworks and modern web stacks.",
  },
  {
    id: "vanilla",
    label: "Plain HTML",
    description:
      "Static sites and hand-coded pages — the simplest install.",
  },
];

export default function EmbedIndexPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Breadcrumbs
          items={[
            { label: "Docs", href: "/docs/widget" },
            { label: "Embed Guides" },
          ]}
        />

        <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          Embed Sift on any platform
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-muted">
          Pick your platform below for a step-by-step guide. Every install takes
          under 5 minutes — most take under 2.
        </p>

        <div className="mt-8 rounded-md border border-signal/20 bg-signal-light/10 p-4 text-sm text-graphite">
          <strong>One snippet, every platform.</strong> Sift is a single script
          tag that uses Shadow DOM to stay isolated from your site styles. It
          works the same way on Shopify, WordPress, React, or any platform that
          accepts custom HTML.
        </div>

        {CATEGORIES.map((cat) => {
          const platforms = embedPlatforms.filter((p) => p.category === cat.id);
          if (platforms.length === 0) return null;
          return (
            <section key={cat.id} className="mt-12">
              <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
                {cat.label}
              </h2>
              <p className="mt-1 text-sm text-slate-muted">{cat.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {platforms.map((platform) => (
                  <Link
                    key={platform.slug}
                    href={`/docs/embed/${platform.slug}`}
                    className="group block rounded-lg border border-border bg-ice p-6 transition hover:border-signal hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-graphite group-hover:text-signal font-[family-name:var(--font-heading)]">
                        {platform.name}
                      </h3>
                      <span className="rounded-full bg-signal-light/20 px-2 py-0.5 text-xs font-medium text-signal">
                        {platform.estimatedTime}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-muted line-clamp-2">
                      {platform.description}
                    </p>
                    <p className="mt-4 inline-flex items-center text-xs font-medium text-signal">
                      View install guide &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Back links */}
        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-6 text-sm">
          <Link
            href="/docs/widget"
            className="font-medium text-signal hover:underline"
          >
            &larr; Widget documentation
          </Link>
          <Link
            href="/docs/api"
            className="font-medium text-signal hover:underline"
          >
            API documentation &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
