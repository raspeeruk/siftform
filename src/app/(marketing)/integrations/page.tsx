import Link from "next/link";
import type { Metadata } from "next";
import { integrations } from "@/lib/pseo/integrations";
import { Breadcrumbs } from "@/components/pseo/breadcrumbs";
import { createMetadata } from "@/lib/pseo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Integrations",
  description:
    "Connect Sift to Zapier, Slack, HubSpot, Google Sheets, Jira, and more. Send structured extraction data anywhere via webhooks.",
  path: "/integrations",
});

const CATEGORIES = [
  { id: "automation", label: "Automation" },
  { id: "crm", label: "CRM" },
  { id: "project-management", label: "Project Management" },
  { id: "communication", label: "Communication" },
  { id: "database", label: "Databases & Sheets" },
  { id: "website", label: "Websites" },
  { id: "support", label: "Support" },
] as const;

export default function IntegrationsPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Breadcrumbs items={[{ label: "Integrations" }]} />

        <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          Integrations
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-muted">
          Sift sends structured data to your tools via webhooks. Connect to
          anything that accepts HTTP — or use Zapier and Make for 5,000+ app
          connections.
        </p>

        {CATEGORIES.map((cat) => {
          const items = integrations.filter((i) => i.category === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id} className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
                {cat.label}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/integrations/${item.slug}`}
                    className="group flex items-start gap-4 rounded-lg border border-border bg-ice p-5 transition hover:border-signal/30 hover:shadow-sm"
                  >
                    <span className="text-2xl">{item.logo}</span>
                    <div>
                      <h3 className="text-sm font-bold text-graphite group-hover:text-signal">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-muted">
                        {item.description.slice(0, 100)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
