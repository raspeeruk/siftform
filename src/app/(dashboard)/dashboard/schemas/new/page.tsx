"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SchemaField } from "@/lib/db/schema";
import { SchemaFieldEditor } from "@/components/schema-field-editor";

export default function NewSchemaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-populate from template if provided via query params
  const templateName = searchParams.get("name") || "";
  const templateDesc = searchParams.get("description") || "";
  const templateFields = searchParams.get("fields");

  const [name, setName] = useState(templateName);
  const [description, setDescription] = useState(templateDesc);
  const [fields, setFields] = useState<SchemaField[]>(
    templateFields ? JSON.parse(decodeURIComponent(templateFields)) : []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!name.trim()) {
      setError("Form name is required");
      return;
    }
    if (fields.length === 0) {
      setError("Add at least one field");
      return;
    }
    if (fields.some((f) => !f.name || !f.label)) {
      setError("All fields must have a name and label");
      return;
    }

    setSaving(true);
    setError("");

    // Auto-populate widget subtitle from description
    const widgetConfig = description.trim()
      ? { copy: { subtitle: description.trim() } }
      : undefined;

    const res = await fetch("/api/dashboard/schemas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, fields, widgetConfig }),
    });

    if (res.ok) {
      const schema = await res.json();
      router.push(`/dashboard/schemas/${schema.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create form");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          New Form
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Define the fields you want to extract from user input
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-alert/20 bg-alert/5 px-4 py-3 text-sm text-alert">
          {error}
        </div>
      )}

      <div className="space-y-4 rounded-lg border border-border bg-ice p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-graphite">
            Form Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Support Ticket, Lead Intake"
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-graphite">
            Description{" "}
            <span className="text-slate-muted">(helps AI + guides widget visitors)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Tell us about your support issue, including your name and account details"
            rows={2}
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
          />
          <p className="mt-1 text-xs text-slate-muted">
            This text appears in your widget to guide visitors on what to write
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
          Fields
        </h2>
        <SchemaFieldEditor fields={fields} onChange={setFields} />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <button
          onClick={() => router.back()}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-graphite hover:bg-polar"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-signal px-6 py-2 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create form"}
        </button>
      </div>
    </div>
  );
}
