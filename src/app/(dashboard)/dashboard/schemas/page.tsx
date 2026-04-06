"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Schema = {
  id: string;
  name: string;
  description: string | null;
  fields: any[];
  isActive: boolean;
  createdAt: string;
};

export default function SchemasPage() {
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/schemas")
      .then((r) => r.json())
      .then(setSchemas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            Forms
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            Define what data to extract from user input
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/schemas/templates"
            className="rounded-md border border-border bg-ice px-4 py-2 text-sm font-medium text-graphite hover:bg-polar"
          >
            Templates
          </Link>
          <Link
            href="/dashboard/schemas/new"
            className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
          >
            New form
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-muted">
          Loading...
        </div>
      ) : schemas.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-ice p-12 text-center">
          <p className="text-sm text-slate-muted">
            No forms yet. Create one to start extracting data.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/dashboard/schemas/templates"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-graphite hover:bg-polar"
            >
              Start from template
            </Link>
            <Link
              href="/dashboard/schemas/new"
              className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Create from scratch
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemas.map((schema) => (
            <Link
              key={schema.id}
              href={`/dashboard/schemas/${schema.id}`}
              className="group rounded-lg border border-border bg-ice p-5 transition hover:border-signal/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-graphite font-[family-name:var(--font-heading)]">
                  {schema.name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    schema.isActive
                      ? "bg-verified/10 text-verified"
                      : "bg-polar text-slate-muted"
                  }`}
                >
                  {schema.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {schema.description && (
                <p className="mt-1 text-sm text-slate-muted line-clamp-2">
                  {schema.description}
                </p>
              )}
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-muted">
                <span>{schema.fields?.length || 0} fields</span>
                <span>&middot;</span>
                <span>
                  {new Date(schema.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
