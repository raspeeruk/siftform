"use client";

import { useState } from "react";
import { SchemaField } from "@/lib/db/schema";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "boolean", label: "Yes/No" },
  { value: "url", label: "URL" },
];

export function SchemaFieldEditor({
  fields,
  onChange,
}: {
  fields: SchemaField[];
  onChange: (fields: SchemaField[]) => void;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function addField() {
    const newField: SchemaField = {
      name: "",
      label: "",
      type: "text",
      required: false,
    };
    onChange([...fields, newField]);
    setExpandedIndex(fields.length);
  }

  function updateField(index: number, updates: Partial<SchemaField>) {
    const updated = [...fields];
    updated[index] = { ...updated[index], ...updates };
    // Auto-generate name from label
    if (updates.label && !updated[index].name) {
      updated[index].name = updates.label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
    }
    onChange(updated);
  }

  function removeField(index: number) {
    onChange(fields.filter((_, i) => i !== index));
    setExpandedIndex(null);
  }

  function moveField(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fields.length) return;
    const updated = [...fields];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
    setExpandedIndex(newIndex);
  }

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-white"
        >
          {/* Field header */}
          <button
            type="button"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            className="flex w-full items-center gap-3 px-4 py-3 text-left"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded bg-polar text-[10px] font-medium text-slate-muted">
              {index + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-graphite">
              {field.label || field.name || "Untitled field"}
            </span>
            <span className="rounded bg-polar px-1.5 py-0.5 text-[10px] font-medium text-slate-muted">
              {field.type}
            </span>
            {field.required && (
              <span className="rounded bg-signal-light px-1.5 py-0.5 text-[10px] font-medium text-signal">
                Required
              </span>
            )}
            <svg
              className={`h-4 w-4 text-slate-muted transition ${
                expandedIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {/* Expanded editor */}
          {expandedIndex === index && (
            <div className="border-t border-border px-4 py-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-muted">
                    Label
                  </label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateField(index, { label: e.target.value })
                    }
                    placeholder="e.g., Customer Name"
                    className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-muted">
                    Field Name
                  </label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      updateField(index, { name: e.target.value })
                    }
                    placeholder="e.g., customer_name"
                    className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm font-[family-name:var(--font-mono)] text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-muted">
                    Type
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(index, {
                        type: e.target.value as SchemaField["type"],
                      })
                    }
                    className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm text-graphite focus:border-signal focus:outline-none"
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(index, { required: e.target.checked })
                      }
                      className="rounded border-border text-signal focus:ring-signal"
                    />
                    <span className="text-sm text-graphite">Required</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-muted">
                  Description{" "}
                  <span className="text-slate-muted/50">(helps AI extract)</span>
                </label>
                <input
                  type="text"
                  value={field.description || ""}
                  onChange={(e) =>
                    updateField(index, { description: e.target.value })
                  }
                  placeholder="e.g., The customer's full legal name"
                  className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-muted">
                  Examples{" "}
                  <span className="text-slate-muted/50">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={field.examples?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(index, {
                      examples: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="e.g., John Smith, Jane Doe"
                  className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                />
              </div>

              {field.type === "select" && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-muted">
                    Options{" "}
                    <span className="text-slate-muted/50">
                      (comma-separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={field.options?.join(", ") || ""}
                    onChange={(e) =>
                      updateField(index, {
                        options: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g., Option A, Option B, Option C"
                    className="w-full rounded-md border border-border bg-ice px-3 py-1.5 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveField(index, -1)}
                    disabled={index === 0}
                    className="rounded p-1.5 text-slate-muted hover:bg-polar disabled:opacity-30"
                    title="Move up"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveField(index, 1)}
                    disabled={index === fields.length - 1}
                    className="rounded p-1.5 text-slate-muted hover:bg-polar disabled:opacity-30"
                    title="Move down"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="rounded px-2 py-1 text-xs font-medium text-alert hover:bg-alert/5"
                >
                  Remove field
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm font-medium text-slate-muted hover:border-signal/30 hover:text-signal"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add field
      </button>
    </div>
  );
}
