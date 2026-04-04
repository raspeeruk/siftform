"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { SchemaField, WidgetConfig } from "@/lib/db/schema";
import { SchemaFieldEditor } from "@/components/schema-field-editor";

type Schema = {
  id: string;
  name: string;
  description: string | null;
  fields: SchemaField[];
  widgetConfig: WidgetConfig;
  isActive: boolean;
};

export default function SchemaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [schema, setSchema] = useState<Schema | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<SchemaField[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"fields" | "widget" | "embed">("fields");

  useEffect(() => {
    fetch("/api/dashboard/schemas")
      .then((r) => r.json())
      .then((schemas: Schema[]) => {
        const s = schemas.find((s) => s.id === id);
        if (s) {
          setSchema(s);
          setName(s.name);
          setDescription(s.description || "");
          setFields(s.fields);
        }
      });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/dashboard/schemas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, description, fields }),
    });
    setSaving(false);
  }

  if (!schema)
    return (
      <div className="py-12 text-center text-sm text-slate-muted">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            {schema.name}
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            {schema.fields.length} fields &middot; Schema ID:{" "}
            <code className="font-[family-name:var(--font-mono)] text-xs">
              {id}
            </code>
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["fields", "widget", "embed"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2 text-sm font-medium capitalize transition ${
              tab === t
                ? "border-signal text-signal"
                : "border-transparent text-slate-muted hover:text-graphite"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "fields" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-graphite">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-border bg-ice px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-graphite">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-border bg-ice px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
              />
            </div>
          </div>
          <SchemaFieldEditor fields={fields} onChange={setFields} />
        </div>
      )}

      {tab === "widget" && (
        <div className="rounded-lg border border-border bg-ice p-6">
          <h3 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
            Widget Configuration
          </h3>
          <p className="mt-1 text-sm text-slate-muted">
            Customize the look and feel of your embedded widget. Changes auto-save.
          </p>
          <p className="mt-4 text-xs text-slate-muted">
            Widget configurator coming in Phase 5.
          </p>
        </div>
      )}

      {tab === "embed" && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-ice p-6">
            <h3 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
              Embed Code
            </h3>
            <p className="mt-1 text-sm text-slate-muted">
              Add this script tag to any webpage to embed the Sift widget.
            </p>
            <div className="mt-4 rounded-md bg-deep p-4">
              <code className="block whitespace-pre-wrap break-all font-[family-name:var(--font-mono)] text-xs text-green-400">
                {`<script\n  src="https://siftforms.com/widget/v1.js"\n  data-schema-id="${id}"\n  data-api-key="YOUR_PUBLIC_KEY"\n  async\n></script>`}
              </code>
            </div>
            <p className="mt-3 text-xs text-slate-muted">
              Replace <code className="font-[family-name:var(--font-mono)]">YOUR_PUBLIC_KEY</code> with a public
              API key from{" "}
              <a
                href="/dashboard/api-keys"
                className="text-signal hover:underline"
              >
                API Keys
              </a>
              .
            </p>
          </div>

          <div className="rounded-lg border border-border bg-ice p-6">
            <h3 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
              API Usage
            </h3>
            <div className="mt-4 rounded-md bg-deep p-4">
              <code className="block whitespace-pre-wrap font-[family-name:var(--font-mono)] text-xs text-green-400">
                {`curl -X POST https://siftforms.com/api/v1/extract \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"text": "Your text here", "schema_id": "${id}"}'`}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
