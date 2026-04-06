"use client";

import Link from "next/link";
import { schemaTemplates } from "@/lib/schema-templates";

export default function SchemaTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Form Templates
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Start with a pre-built form and customize it for your use case
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schemaTemplates.map((template) => (
          <div
            key={template.name}
            className="flex flex-col rounded-lg border border-border bg-ice p-5"
          >
            <h3 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
              {template.name}
            </h3>
            <p className="mt-1 flex-1 text-sm text-slate-muted">
              {template.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {template.fields.slice(0, 4).map((f) => (
                <span
                  key={f.name}
                  className="rounded bg-polar px-1.5 py-0.5 text-[10px] font-medium text-slate-muted"
                >
                  {f.label}
                </span>
              ))}
              {template.fields.length > 4 && (
                <span className="rounded bg-polar px-1.5 py-0.5 text-[10px] font-medium text-slate-muted">
                  +{template.fields.length - 4} more
                </span>
              )}
            </div>
            <Link
              href={`/dashboard/schemas/new?name=${encodeURIComponent(
                template.name
              )}&description=${encodeURIComponent(
                template.description
              )}&fields=${encodeURIComponent(JSON.stringify(template.fields))}`}
              className="mt-4 w-full rounded-md bg-signal px-4 py-2 text-center text-sm font-medium text-white hover:bg-signal-dark"
            >
              Use template
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
