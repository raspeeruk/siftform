"use client";

import { useEffect, useState } from "react";

type Insights = {
  total: number;
  averageConfidence: number;
  schemaBreakdown: { schemaName: string; count: number; avgConfidence: string }[];
  statusBreakdown: { status: string; count: number }[];
  dailyCounts: { date: string; count: number }[];
  usage: { used: number; limit: number; plan: string } | null;
};

export default function InsightsPage() {
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-12 text-center text-sm text-slate-muted">
        Loading insights...
      </div>
    );

  if (!data)
    return (
      <div className="py-12 text-center text-sm text-slate-muted">
        Failed to load insights.
      </div>
    );

  const maxDailyCount = Math.max(...data.dailyCounts.map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          AI Insights
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Extraction analytics and patterns across your data
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Extractions" value={data.total} />
        <StatCard
          label="Avg. Confidence"
          value={`${(data.averageConfidence * 100).toFixed(0)}%`}
        />
        <StatCard
          label="Completed"
          value={
            data.statusBreakdown.find((s) => s.status === "completed")?.count ||
            0
          }
        />
        <StatCard
          label="Pending"
          value={
            data.statusBreakdown.find((s) => s.status === "pending")?.count || 0
          }
        />
      </div>

      {/* Usage meter */}
      {data.usage && (
        <div className="rounded-lg border border-border bg-ice p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
                Usage this period
              </p>
              <p className="mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)]">
                {data.usage.used}{" "}
                <span className="text-sm font-normal text-slate-muted">
                  / {data.usage.limit}
                </span>
              </p>
            </div>
            <span className="rounded-full bg-polar px-3 py-1 text-xs font-medium capitalize text-slate-muted">
              {data.usage.plan} plan
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-polar">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min((data.usage.used / data.usage.limit) * 100, 100)}%`,
                backgroundColor:
                  data.usage.used / data.usage.limit > 0.9
                    ? "#DC2626"
                    : data.usage.used / data.usage.limit > 0.7
                    ? "#D97706"
                    : "#2563EB",
              }}
            />
          </div>
        </div>
      )}

      {/* Activity chart (text bars) */}
      {data.dailyCounts.length > 0 && (
        <div className="rounded-lg border border-border bg-ice p-5">
          <h2 className="text-sm font-medium text-graphite font-[family-name:var(--font-heading)]">
            Daily Extractions (Last 7 Days)
          </h2>
          <div className="mt-4 space-y-2">
            {data.dailyCounts.map((day) => (
              <div key={day.date} className="flex items-center gap-3">
                <span className="w-20 text-right font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                  {new Date(day.date + "T00:00:00").toLocaleDateString(
                    undefined,
                    { weekday: "short", month: "short", day: "numeric" }
                  )}
                </span>
                <div className="flex-1">
                  <div
                    className="h-5 rounded bg-signal/20"
                    style={{
                      width: `${(day.count / maxDailyCount) * 100}%`,
                      minWidth: "2px",
                    }}
                  >
                    <div
                      className="h-full rounded bg-signal"
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right font-[family-name:var(--font-mono)] text-xs font-medium text-graphite">
                  {day.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schema breakdown */}
      {data.schemaBreakdown.length > 0 && (
        <div className="rounded-lg border border-border bg-ice p-5">
          <h2 className="text-sm font-medium text-graphite font-[family-name:var(--font-heading)]">
            By Schema
          </h2>
          <div className="mt-3 overflow-hidden rounded border border-border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-polar/50 text-left">
                  <th className="px-4 py-2 font-medium text-slate-muted">
                    Schema
                  </th>
                  <th className="px-4 py-2 font-medium text-slate-muted">
                    Extractions
                  </th>
                  <th className="px-4 py-2 font-medium text-slate-muted">
                    Avg Confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.schemaBreakdown.map((row) => (
                  <tr
                    key={row.schemaName}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-2 text-graphite">
                      {row.schemaName}
                    </td>
                    <td className="px-4 py-2 font-[family-name:var(--font-mono)] text-graphite">
                      {row.count}
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                        {(Number(row.avgConfidence) * 100).toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.total === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-ice p-12 text-center">
          <p className="text-sm text-slate-muted">
            No extraction data yet. Try the Playground to test extraction, or
            embed the widget to start collecting real data.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-border bg-ice p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-graphite font-[family-name:var(--font-heading)]">
        {value}
      </p>
    </div>
  );
}
