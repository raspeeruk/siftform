"use client";

import { useEffect, useState } from "react";

type Schema = { id: string; name: string; fields: any[] };
type ExtractionResult = {
  fields: Record<string, { value: unknown; confidence: number }>;
  extras: Record<string, unknown>;
  missing_required: string[];
  overall_confidence: number;
  warnings: string[];
} | null;

export default function PlaygroundPage() {
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string>("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<ExtractionResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/schemas")
      .then((r) => r.json())
      .then((data: Schema[]) => {
        setSchemas(data);
        if (data.length > 0) setSelectedSchema(data[0].id);
      });
  }, []);

  async function handleExtract() {
    if (!text.trim() || !selectedSchema) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/dashboard/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, schema_id: selectedSchema }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Extraction failed");
        return;
      }

      setResult(await res.json());
    } catch {
      setError("Extraction failed");
    } finally {
      setLoading(false);
    }
  }

  const sampleTexts: Record<string, string> = {
    "Support Ticket":
      "Hi, my name is Sarah Chen and I've been having trouble with my account. I keep getting charged $49.99 every month but I cancelled my subscription back in January. My email is sarah.chen@gmail.com and my account number is ACC-2847. This is really frustrating.",
    "Lead Intake":
      "Hey there, I'm Michael Torres from Greenfield Analytics. We're a mid-size data company (about 150 employees) looking for a better way to handle our customer onboarding forms. Currently spending 3-4 hours a day on manual data entry. Budget is around $500/month. We need something by end of Q2. My email is michael@greenfieldanalytics.com, you can reach me at +1-555-0192.",
    "Bug Report":
      "The export CSV button on the dashboard is completely broken. When I click it, nothing happens for about 30 seconds, then I get a blank white page. I'm using Chrome 120 on macOS Sonoma. Steps: go to Dashboard > Submissions, click Export CSV with more than 50 rows. Expected: CSV download. Actual: blank page. This is blocking our weekly reporting. Email: dev@acme.com",
  };

  function loadSample() {
    const schema = schemas.find((s) => s.id === selectedSchema);
    if (schema) {
      const sample =
        sampleTexts[schema.name] ||
        "Hi, I need help with a billing issue. My name is John Smith, email john@example.com. I was charged twice on March 15th for $99.99.";
      setText(sample);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Playground
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Test extraction without creating a submission. Free, unlimited.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-muted">
                Schema
              </label>
              <select
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
                className="w-full rounded-md border border-border bg-ice px-3 py-2 text-sm text-graphite focus:border-signal focus:outline-none"
              >
                {schemas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.fields.length} fields)
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={loadSample}
              className="rounded-md border border-border px-3 py-2 text-xs font-medium text-slate-muted hover:bg-polar"
            >
              Load sample
            </button>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-muted">
              Text Input
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Paste or type unstructured text here..."
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted/50 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal"
            />
          </div>

          <button
            onClick={handleExtract}
            disabled={loading || !text.trim() || !selectedSchema}
            className="w-full rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-50"
          >
            {loading ? "Extracting..." : "Extract data"}
          </button>

          {error && (
            <div className="rounded-md border border-alert/20 bg-alert/5 px-4 py-3 text-sm text-alert">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-muted">
              Extraction Result
            </label>
            {result && (
              <span className="flex items-center gap-1.5 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${
                    result.overall_confidence >= 0.8
                      ? "bg-verified"
                      : result.overall_confidence >= 0.5
                      ? "bg-extract"
                      : "bg-alert"
                  }`}
                />
                <span className="font-[family-name:var(--font-mono)] text-slate-muted">
                  {(result.overall_confidence * 100).toFixed(0)}% overall
                </span>
              </span>
            )}
          </div>

          <div className="min-h-[300px] rounded-lg border border-border bg-ice p-5">
            {!result && !loading && (
              <p className="py-12 text-center text-sm text-slate-muted">
                Enter text and click Extract to see results
              </p>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-signal border-t-transparent" />
              </div>
            )}

            {result && (
              <div className="space-y-3">
                {/* Fields */}
                {Object.entries(result.fields).map(
                  ([key, { value, confidence }]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded bg-white px-3 py-2"
                    >
                      <div className="flex-1">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-muted">
                          {key}
                        </span>
                        <p className="font-[family-name:var(--font-mono)] text-sm text-graphite">
                          {value === null
                            ? "—"
                            : typeof value === "boolean"
                            ? value
                              ? "Yes"
                              : "No"
                            : String(value)}
                        </p>
                      </div>
                      <span className="flex items-center gap-1">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            confidence >= 0.8
                              ? "bg-verified"
                              : confidence >= 0.5
                              ? "bg-extract"
                              : "bg-alert"
                          }`}
                        />
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-slate-muted">
                          {(confidence * 100).toFixed(0)}%
                        </span>
                      </span>
                    </div>
                  )
                )}

                {/* Extras */}
                {Object.keys(result.extras).length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-muted">
                      Extras (unmapped)
                    </p>
                    <pre className="mt-1 rounded bg-white p-2 font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                      {JSON.stringify(result.extras, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="mt-4 rounded border border-warning/30 bg-extract-light p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-warning">
                      Warnings
                    </p>
                    {result.warnings.map((w, i) => (
                      <p key={i} className="mt-1 text-xs text-graphite">
                        {w}
                      </p>
                    ))}
                  </div>
                )}

                {/* Missing required */}
                {result.missing_required.length > 0 && (
                  <div className="mt-4 rounded border border-alert/30 bg-alert/5 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-alert">
                      Missing required
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {result.missing_required.map((f) => (
                        <span
                          key={f}
                          className="rounded bg-alert/10 px-1.5 py-0.5 text-[10px] font-medium text-alert"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
