"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  schemaId: string;
  rawInput: string;
  status: string;
  overallConfidence: number | null;
  createdAt: string;
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    // Use the dashboard endpoint (session auth)
    fetch("/api/dashboard/submissions")
      .then((r) => r.json())
      .then((data) => setSubmissions(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = statusFilter
    ? submissions.filter((s) => s.status === statusFilter)
    : submissions;

  function downloadCSV() {
    const headers = [
      "ID",
      "Status",
      "Confidence",
      "Input Preview",
      "Created",
    ];
    const rows = filtered.map((s) => [
      s.id,
      s.status,
      s.overallConfidence?.toFixed(2) || "",
      s.rawInput.slice(0, 100).replace(/,/g, ";"),
      s.createdAt,
    ]);
    const csv =
      [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sift-submissions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            Submissions
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            All extracted data submissions
          </p>
        </div>
        <button
          onClick={downloadCSV}
          disabled={filtered.length === 0}
          className="rounded-md border border-border bg-ice px-4 py-2 text-sm font-medium text-graphite hover:bg-polar disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["", "completed", "pending"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              statusFilter === s
                ? "bg-signal text-white"
                : "bg-polar text-slate-muted hover:bg-border"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-muted">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-ice p-12 text-center">
          <p className="text-sm text-slate-muted">No submissions yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-ice">
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
              {filtered.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-border last:border-0 hover:bg-polar/50"
                >
                  <td className="max-w-xs px-4 py-2.5">
                    <Link
                      href={`/dashboard/submissions/${sub.id}`}
                      className="block truncate text-graphite hover:text-signal"
                    >
                      {sub.rawInput.slice(0, 80)}
                      {sub.rawInput.length > 80 ? "..." : ""}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5">
                    <ConfidenceBadge value={sub.overallConfidence} />
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ConfidenceBadge({ value }: { value: number | null }) {
  const conf = value ?? 0;
  const color =
    conf >= 0.8
      ? "bg-verified"
      : conf >= 0.5
      ? "bg-extract"
      : "bg-alert";
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-[family-name:var(--font-mono)] text-xs text-slate-muted">
        {(conf * 100).toFixed(0)}%
      </span>
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "completed"
      ? "bg-verified/10 text-verified"
      : "bg-extract-light text-warning";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
