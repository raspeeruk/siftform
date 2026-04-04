"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  schemaId: string;
  rawInput: string;
  rawInputType: string;
  extractedData: Record<string, { value: unknown; confidence: number }> | null;
  extras: Record<string, unknown> | null;
  missingRequired: string[] | null;
  status: string;
  overallConfidence: number | null;
  warnings: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/submissions")
      .then((r) => r.json())
      .then((subs: Submission[]) => {
        setSubmission(subs.find((s) => s.id === id) || null);
      });
  }, [id]);

  if (!submission)
    return (
      <div className="py-12 text-center text-sm text-slate-muted">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/submissions"
            className="text-xs text-signal hover:underline"
          >
            &larr; All submissions
          </Link>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            Submission Detail
          </h1>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            submission.status === "completed"
              ? "bg-verified/10 text-verified"
              : "bg-extract-light text-warning"
          }`}
        >
          {submission.status}
        </span>
      </div>

      {/* Raw input */}
      <div className="rounded-lg border border-border bg-ice p-5">
        <h2 className="text-sm font-medium text-slate-muted">Raw Input</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-graphite">
          {submission.rawInput}
        </p>
        <p className="mt-2 text-xs text-slate-muted">
          Type: {submission.rawInputType} &middot; Overall confidence:{" "}
          <span className="font-[family-name:var(--font-mono)]">
            {((submission.overallConfidence || 0) * 100).toFixed(0)}%
          </span>
        </p>
      </div>

      {/* Extracted fields */}
      {submission.extractedData && (
        <div className="rounded-lg border border-border bg-ice p-5">
          <h2 className="text-sm font-medium text-slate-muted">
            Extracted Fields
          </h2>
          <div className="mt-3 space-y-2">
            {Object.entries(submission.extractedData).map(
              ([key, { value, confidence }]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded bg-white px-3 py-2"
                >
                  <div>
                    <span className="text-xs font-medium text-slate-muted">
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
                  <ConfidenceDot confidence={confidence} />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Extras */}
      {submission.extras &&
        Object.keys(submission.extras).length > 0 && (
          <div className="rounded-lg border border-border bg-ice p-5">
            <h2 className="text-sm font-medium text-slate-muted">
              Extras (unmapped data)
            </h2>
            <pre className="mt-3 overflow-auto rounded bg-white p-3 font-[family-name:var(--font-mono)] text-xs text-graphite">
              {JSON.stringify(submission.extras, null, 2)}
            </pre>
          </div>
        )}

      {/* Warnings */}
      {submission.warnings && submission.warnings.length > 0 && (
        <div className="rounded-lg border border-warning/30 bg-extract-light p-5">
          <h2 className="text-sm font-medium text-warning">Warnings</h2>
          <ul className="mt-2 space-y-1">
            {submission.warnings.map((w, i) => (
              <li key={i} className="text-sm text-graphite">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing required */}
      {submission.missingRequired &&
        submission.missingRequired.length > 0 && (
          <div className="rounded-lg border border-alert/30 bg-alert/5 p-5">
            <h2 className="text-sm font-medium text-alert">
              Missing Required Fields
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {submission.missingRequired.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-alert/10 px-2 py-0.5 text-xs font-medium text-alert"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

      <div className="text-xs text-slate-muted">
        ID: <code className="font-[family-name:var(--font-mono)]">{id}</code>{" "}
        &middot; Created:{" "}
        {new Date(submission.createdAt).toLocaleString()} &middot; Updated:{" "}
        {new Date(submission.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}

function ConfidenceDot({ confidence }: { confidence: number }) {
  const color =
    confidence >= 0.8
      ? "bg-verified"
      : confidence >= 0.5
      ? "bg-extract"
      : "bg-alert";
  return (
    <span className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-[family-name:var(--font-mono)] text-xs text-slate-muted">
        {(confidence * 100).toFixed(0)}%
      </span>
    </span>
  );
}
