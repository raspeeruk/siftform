import type { Metadata } from "next";
import { pseoTemplates, templateCategories } from "@/lib/pseo/templates";
import { TemplateCard } from "@/components/pseo/template-card";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Extraction Templates",
  description:
    "40+ ready-made AI extraction templates for support, sales, legal, healthcare, insurance, HR, engineering, and property. Start extracting structured data in minutes.",
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={[{ label: "Templates" }]} />

        <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          Extraction templates
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-muted">
          Pre-built schemas for common intake scenarios. Pick one, customise the
          fields, and start extracting structured data from natural text.
        </p>

        {templateCategories.map((cat) => {
          const templates = pseoTemplates.filter(
            (t) => t.category === cat.id
          );
          if (templates.length === 0) return null;
          return (
            <section key={cat.id} className="mt-12">
              <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
                {cat.label}
              </h2>
              <p className="mt-1 text-sm text-slate-muted">
                {cat.description}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((t) => (
                  <TemplateCard
                    key={t.slug}
                    slug={t.slug}
                    name={t.name}
                    description={t.description}
                    category={cat.label}
                    fieldCount={t.fields.length}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
