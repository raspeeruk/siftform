import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { schemas, submissions, organizations } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth();
  const orgId = (session as any)?.organizationId;

  if (!orgId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-slate-muted">Loading...</p>
      </div>
    );
  }

  const db = createDb();

  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  const schemaCount = await db
    .select({ count: count() })
    .from(schemas)
    .where(eq(schemas.organizationId, orgId));

  const submissionCount = await db
    .select({ count: count() })
    .from(submissions)
    .where(eq(submissions.organizationId, orgId));

  const recentSubmissions = await db
    .select()
    .from(submissions)
    .where(eq(submissions.organizationId, orgId))
    .orderBy(desc(submissions.createdAt))
    .limit(5);

  const usagePercent = org
    ? Math.round((org.extractionsUsed / org.extractionsLimit) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Overview
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Your extraction dashboard at a glance
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Schemas"
          value={schemaCount[0]?.count || 0}
          href="/dashboard/schemas"
        />
        <StatCard
          label="Submissions"
          value={submissionCount[0]?.count || 0}
          href="/dashboard/submissions"
        />
        <StatCard
          label="Plan"
          value={org?.plan || "starter"}
          href="/dashboard/billing"
          capitalize
        />
        <div className="rounded-lg border border-border bg-ice p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
            Usage
          </p>
          <p className="mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)]">
            {org?.extractionsUsed || 0}{" "}
            <span className="text-sm font-normal text-slate-muted">
              / {org?.extractionsLimit || 500}
            </span>
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-polar">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(usagePercent, 100)}%`,
                backgroundColor:
                  usagePercent > 90
                    ? "#DC2626"
                    : usagePercent > 70
                    ? "#D97706"
                    : "#2563EB",
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent submissions */}
      <div>
        <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
          Recent Submissions
        </h2>
        {recentSubmissions.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-ice p-8 text-center">
            <p className="text-sm text-slate-muted">
              No submissions yet. Create a schema and start extracting data.
            </p>
            <a
              href="/dashboard/schemas"
              className="mt-3 inline-block rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Create your first schema
            </a>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-border bg-ice">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-polar/50 text-left">
                  <th className="px-4 py-2.5 font-medium text-slate-muted">
                    Input
                  </th>
                  <th className="px-4 py-2.5 font-medium text-slate-muted">
                    Confidence
                  </th>
                  <th className="px-4 py-2.5 font-medium text-slate-muted">
                    Status
                  </th>
                  <th className="px-4 py-2.5 font-medium text-slate-muted">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="max-w-xs truncate px-4 py-2.5 text-graphite">
                      {sub.rawInput.slice(0, 80)}
                      {sub.rawInput.length > 80 ? "..." : ""}
                    </td>
                    <td className="px-4 py-2.5">
                      <ConfidenceDot value={sub.overallConfidence} />
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          sub.status === "completed"
                            ? "bg-verified/10 text-verified"
                            : sub.status === "pending"
                            ? "bg-extract-light text-warning"
                            : "bg-polar text-slate-muted"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-muted font-[family-name:var(--font-mono)] text-xs">
                      {sub.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  capitalize,
}: {
  label: string;
  value: string | number;
  href: string;
  capitalize?: boolean;
}) {
  return (
    <a
      href={href}
      className="rounded-lg border border-border bg-ice p-4 transition hover:border-signal/30"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)] ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </a>
  );
}

function ConfidenceDot({ value }: { value: number | null }) {
  const conf = value ?? 0;
  const color =
    conf >= 0.8
      ? "bg-verified"
      : conf >= 0.5
      ? "bg-extract"
      : "bg-alert";

  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
      <span className="font-[family-name:var(--font-mono)] text-xs text-slate-muted">
        {(conf * 100).toFixed(0)}%
      </span>
    </span>
  );
}
