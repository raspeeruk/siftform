export function SchemaPreview({
  fields,
}: {
  fields: { name: string; label: string; type: string; why?: string }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-ice p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-muted">
        Recommended Form Fields
      </h3>
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.name}
            className="flex items-start justify-between gap-4 rounded border border-border bg-white px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-graphite">
                  {field.label}
                </span>
                <span className="rounded bg-polar px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-slate-muted">
                  {field.type}
                </span>
              </div>
              {field.why && (
                <p className="mt-1 text-xs text-slate-muted">{field.why}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
