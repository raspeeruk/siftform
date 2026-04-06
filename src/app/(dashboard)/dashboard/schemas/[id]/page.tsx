"use client";

import { useEffect, useState, use, useMemo } from "react";
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

const SYSTEM_FONTS = [
  { label: "System Default", value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Menlo / Consolas", value: 'Menlo, Consolas, "Courier New", monospace' },
  { label: "Palatino", value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
  { label: "Trebuchet MS", value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
];

const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  theme: {
    primaryColor: "#2563EB",
    backgroundColor: "#FAFCFE",
    textColor: "#1A2332",
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  copy: {
    title: "Tell us what's going on",
    subtitle: "",
    placeholder: "Describe your situation in your own words...",
    buttonText: "Submit",
  },
  behavior: {
    position: "inline",
  },
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
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>(DEFAULT_WIDGET_CONFIG);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"fields" | "widget" | "embed">("fields");
  const [descriptionSyncPrompt, setDescriptionSyncPrompt] = useState(false);

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
          // Merge saved config with defaults
          setWidgetConfig({
            theme: { ...DEFAULT_WIDGET_CONFIG.theme, ...s.widgetConfig?.theme },
            copy: { ...DEFAULT_WIDGET_CONFIG.copy, ...s.widgetConfig?.copy },
            behavior: { ...DEFAULT_WIDGET_CONFIG.behavior, ...s.widgetConfig?.behavior },
          });
        }
      });
  }, [id]);

  function updateConfig<S extends keyof WidgetConfig>(
    section: S,
    key: string,
    value: any
  ) {
    setWidgetConfig((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value,
      },
    }));
  }

  function resetConfig() {
    setWidgetConfig(DEFAULT_WIDGET_CONFIG);
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/dashboard/schemas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, description, fields, widgetConfig }),
    });
    setSaving(false);
  }

  // Resolved config for preview (merges with defaults)
  const resolved = useMemo(() => {
    const theme = { ...DEFAULT_WIDGET_CONFIG.theme, ...widgetConfig.theme };
    const copy = { ...DEFAULT_WIDGET_CONFIG.copy, ...widgetConfig.copy };
    if (!copy.subtitle && description) {
      copy.subtitle = description;
    }
    return { theme, copy };
  }, [widgetConfig, description]);

  function handleDescriptionChange(newDesc: string) {
    setDescription(newDesc);
    // Show sync prompt if subtitle is empty or matches old description
    const currentSubtitle = widgetConfig.copy?.subtitle || "";
    if (
      !currentSubtitle ||
      currentSubtitle === schema?.description
    ) {
      // Auto-sync if subtitle was empty or matched the old description
      updateConfig("copy", "subtitle", newDesc);
    } else if (currentSubtitle !== newDesc) {
      setDescriptionSyncPrompt(true);
    }
  }

  if (!schema)
    return (
      <div className="py-12 text-center text-sm text-slate-muted">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            {schema.name}
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            {schema.fields.length} fields &middot; Form ID:{" "}
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
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="w-full rounded-md border border-border bg-ice px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-muted">
                This text appears in your widget to guide visitors on what to write
              </p>
              {descriptionSyncPrompt && (
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateConfig("copy", "subtitle", description);
                      setDescriptionSyncPrompt(false);
                    }}
                    className="text-xs text-signal hover:underline"
                  >
                    Update widget subtitle to match?
                  </button>
                  <button
                    onClick={() => setDescriptionSyncPrompt(false)}
                    className="text-xs text-slate-muted hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
          <SchemaFieldEditor fields={fields} onChange={setFields} />
        </div>
      )}

      {tab === "widget" && (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Controls (60%) */}
          <div className="space-y-6 lg:col-span-3">
            {/* Theme */}
            <div className="rounded-lg border border-border bg-ice p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-muted">
                Theme
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={widgetConfig.theme?.primaryColor || "#2563EB"}
                      onChange={(e) => updateConfig("theme", "primaryColor", e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded border border-border"
                    />
                    <input
                      type="text"
                      value={widgetConfig.theme?.primaryColor || "#2563EB"}
                      onChange={(e) => updateConfig("theme", "primaryColor", e.target.value)}
                      className="flex-1 rounded-md border border-border bg-white px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-graphite focus:border-signal focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={widgetConfig.theme?.backgroundColor || "#FAFCFE"}
                      onChange={(e) => updateConfig("theme", "backgroundColor", e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded border border-border"
                    />
                    <input
                      type="text"
                      value={widgetConfig.theme?.backgroundColor || "#FAFCFE"}
                      onChange={(e) => updateConfig("theme", "backgroundColor", e.target.value)}
                      className="flex-1 rounded-md border border-border bg-white px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-graphite focus:border-signal focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={widgetConfig.theme?.textColor || "#1A2332"}
                      onChange={(e) => updateConfig("theme", "textColor", e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded border border-border"
                    />
                    <input
                      type="text"
                      value={widgetConfig.theme?.textColor || "#1A2332"}
                      onChange={(e) => updateConfig("theme", "textColor", e.target.value)}
                      className="flex-1 rounded-md border border-border bg-white px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-graphite focus:border-signal focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Border Radius
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={24}
                      value={widgetConfig.theme?.borderRadius ?? 8}
                      onChange={(e) => updateConfig("theme", "borderRadius", Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-8 text-right font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                      {widgetConfig.theme?.borderRadius ?? 8}px
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-graphite">
                  Font Family
                </label>
                <select
                  value={widgetConfig.theme?.fontFamily || SYSTEM_FONTS[0].value}
                  onChange={(e) => updateConfig("theme", "fontFamily", e.target.value)}
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
                >
                  {SYSTEM_FONTS.map((f) => (
                    <option key={f.label} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Copy */}
            <div className="rounded-lg border border-border bg-ice p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-muted">
                Copy
              </h3>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Title
                  </label>
                  <input
                    type="text"
                    value={widgetConfig.copy?.title || ""}
                    onChange={(e) => updateConfig("copy", "title", e.target.value)}
                    placeholder="Tell us what's going on"
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Subtitle{" "}
                    <span className="text-slate-muted">(defaults to form description)</span>
                  </label>
                  <input
                    type="text"
                    value={widgetConfig.copy?.subtitle || ""}
                    onChange={(e) => updateConfig("copy", "subtitle", e.target.value)}
                    placeholder={description || "Guides visitors on what to write"}
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={widgetConfig.copy?.placeholder || ""}
                    onChange={(e) => updateConfig("copy", "placeholder", e.target.value)}
                    placeholder="Describe your situation in your own words..."
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-graphite">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={widgetConfig.copy?.buttonText || ""}
                    onChange={(e) => updateConfig("copy", "buttonText", e.target.value)}
                    placeholder="Submit"
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Behavior */}
            <div className="rounded-lg border border-border bg-ice p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-muted">
                Behavior
              </h3>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-graphite">
                  Position
                </label>
                <select
                  value={widgetConfig.behavior?.position || "inline"}
                  onChange={(e) => updateConfig("behavior", "position", e.target.value)}
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
                >
                  <option value="inline">Inline</option>
                  <option value="bottom-right">Bottom Right (coming soon)</option>
                  <option value="bottom-left">Bottom Left (coming soon)</option>
                </select>
              </div>
            </div>

            <button
              onClick={resetConfig}
              className="text-xs text-slate-muted hover:text-graphite hover:underline"
            >
              Reset to defaults
            </button>
          </div>

          {/* Right: Live Preview (40%) */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
                Live Preview
              </p>
              <WidgetPreview
                theme={resolved.theme}
                copy={resolved.copy}
              />
            </div>
          </div>
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
            <div className="mt-4">
              <a
                href="/docs/embed"
                className="text-sm font-medium text-signal hover:underline"
              >
                Platform-specific install guides &rarr;
              </a>
            </div>
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

// ─── Widget Preview Component ───

function WidgetPreview({
  theme,
  copy,
}: {
  theme: NonNullable<WidgetConfig["theme"]>;
  copy: NonNullable<WidgetConfig["copy"]>;
}) {
  const br = theme.borderRadius ?? 8;
  const innerBr = Math.max(br - 2, 4);

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        border: "1px solid #E2E8F0",
        borderRadius: `${br}px`,
        overflow: "hidden",
        maxWidth: "480px",
        backgroundColor: theme.backgroundColor,
        fontSize: "14px",
        color: theme.textColor,
        lineHeight: "1.5",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #E2E8F0",
          backgroundColor: "#F0F4F8",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "14px", color: theme.textColor }}>
          {copy.title || "Tell us what's going on"}
        </div>
        {copy.subtitle && (
          <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
            {copy.subtitle}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            width: "100%",
            border: "1px solid #E2E8F0",
            borderRadius: `${innerBr}px`,
            padding: "10px 12px",
            fontSize: "14px",
            color: "#94A3B8",
            backgroundColor: "#fff",
            minHeight: "80px",
          }}
        >
          {copy.placeholder || "Describe your situation in your own words..."}
        </div>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: theme.primaryColor,
            color: "#fff",
            border: "none",
            borderRadius: `${innerBr}px`,
            fontWeight: 500,
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {copy.buttonText || "Submit"}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "8px 16px",
          borderTop: "1px solid #E2E8F0",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#94A3B8", fontSize: "11px" }}>
          Powered by Sift
        </span>
      </div>
    </div>
  );
}
