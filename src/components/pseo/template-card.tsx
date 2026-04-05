import Link from "next/link";

export function TemplateCard({
  slug,
  name,
  description,
  category,
  fieldCount,
}: {
  slug: string;
  name: string;
  description: string;
  category: string;
  fieldCount: number;
}) {
  return (
    <Link
      href={`/templates/${slug}`}
      className="group flex flex-col rounded-lg border border-border bg-ice p-5 transition hover:border-signal/30 hover:shadow-sm"
    >
      <span className="mb-2 w-fit rounded bg-signal-light/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-signal">
        {category}
      </span>
      <h3 className="text-base font-bold text-graphite font-[family-name:var(--font-heading)] group-hover:text-signal">
        {name}
      </h3>
      <p className="mt-1 flex-1 text-sm text-slate-muted">{description}</p>
      <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-slate-muted">
        {fieldCount} fields
      </p>
    </Link>
  );
}
