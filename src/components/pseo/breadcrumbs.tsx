import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-1.5 text-sm text-slate-muted"
    >
      <Link href="/" className="hover:text-graphite">
        Sift
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-border">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-graphite">
              {item.label}
            </Link>
          ) : (
            <span className="text-graphite">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
