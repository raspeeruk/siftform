import type { Metadata } from "next";
import Link from "next/link";
import { useCases } from "@/lib/pseo/use-cases";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Use Cases",
  description:
    "See how Sift turns free-text submissions into structured data across 15+ business workflows: support tickets, lead capture, client intake, patient intake, bug reporting, claims, and more.",
  path: "/use-cases",
});

export default function UseCasesIndexPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: "Use Cases" }]} />

        <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          What can Sift do?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-muted">
          Free-text in, structured data out. See how teams use Sift across{" "}
          {useCases.length} common workflows — from triaging support tickets to
          processing insurance claims.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="group block rounded-lg border border-border bg-ice p-6 transition hover:border-signal hover:shadow-sm"
            >
              <h2 className="text-lg font-bold text-graphite group-hover:text-signal font-[family-name:var(--font-heading)]">
                {uc.name}
              </h2>
              <p className="mt-2 text-sm text-slate-muted line-clamp-3">
                {uc.description}
              </p>
              <p className="mt-4 inline-flex items-center text-xs font-medium text-signal">
                See it work &rarr;
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-ice p-8 text-center">
          <h2 className="text-2xl font-bold text-graphite font-[family-name:var(--font-heading)]">
            Don&apos;t see your workflow?
          </h2>
          <p className="mt-2 text-sm text-slate-muted">
            Sift handles any extraction you can describe. Build your own form in
            minutes — no template required.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex rounded-md bg-signal px-6 py-2 text-sm font-medium text-white hover:bg-signal-dark"
          >
            Start free
          </Link>
        </div>
      </div>
    </main>
  );
}
