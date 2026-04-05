import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export function RelatedPages({
  templates,
  useCases,
}: {
  templates?: RelatedLink[];
  useCases?: RelatedLink[];
}) {
  const hasTemplates = templates && templates.length > 0;
  const hasUseCases = useCases && useCases.length > 0;
  if (!hasTemplates && !hasUseCases) return null;

  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
        Related
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {hasTemplates && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
              Templates
            </h3>
            <div className="space-y-2">
              {templates.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="block rounded-lg border border-border bg-ice p-4 transition hover:border-signal/30"
                >
                  <span className="text-sm font-medium text-graphite">
                    {t.label}
                  </span>
                  <p className="mt-0.5 text-xs text-slate-muted">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {hasUseCases && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
              Use Cases
            </h3>
            <div className="space-y-2">
              {useCases.map((u) => (
                <Link
                  key={u.href}
                  href={u.href}
                  className="block rounded-lg border border-border bg-ice p-4 transition hover:border-signal/30"
                >
                  <span className="text-sm font-medium text-graphite">
                    {u.label}
                  </span>
                  <p className="mt-0.5 text-xs text-slate-muted">
                    {u.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
