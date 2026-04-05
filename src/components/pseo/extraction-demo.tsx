"use client";

import { useState, useEffect, useRef } from "react";

type ExtractedField = {
  label: string;
  value: string;
  confidence: number;
};

export function ExtractionDemo({
  inputText,
  outputFields,
  inputLabel = "What users type",
  outputLabel = "What you get",
}: {
  inputText: string;
  outputFields: ExtractedField[];
  inputLabel?: string;
  outputLabel?: string;
}) {
  const [visibleFields, setVisibleFields] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleFields(i);
            if (i >= outputFields.length) clearInterval(interval);
          }, 150);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, outputFields.length]);

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2">
      {/* Input side */}
      <div className="rounded-lg border border-border bg-ice p-6 text-left">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
          {inputLabel}
        </p>
        <div className="rounded border border-border bg-white p-4 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-graphite">
          {inputText}
        </div>
      </div>

      {/* Output side */}
      <div className="rounded-lg border border-border bg-ice p-6 text-left">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
          {outputLabel}
        </p>
        <div className="space-y-2.5 rounded border border-border bg-white p-4">
          {outputFields.map((field, i) => (
            <div
              key={field.label}
              className={`flex items-center justify-between gap-2 transition-all duration-300 ${
                i < visibleFields
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <div>
                <span className="text-xs font-medium text-slate-muted">
                  {field.label}
                </span>
                <p className="font-[family-name:var(--font-mono)] text-sm text-graphite">
                  {field.value}
                </p>
              </div>
              <ConfidenceDot confidence={field.confidence} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfidenceDot({ confidence }: { confidence: number }) {
  const color =
    confidence >= 0.9
      ? "bg-verified"
      : confidence >= 0.7
        ? "bg-extract"
        : "bg-alert";

  return (
    <span className="flex shrink-0 items-center gap-1">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-slate-muted">
        {(confidence * 100).toFixed(0)}%
      </span>
    </span>
  );
}

/** Static version (no animation) for SSR-heavy pages */
export function ExtractionDemoStatic({
  inputText,
  outputFields,
  inputLabel = "What users type",
  outputLabel = "What you get",
}: {
  inputText: string;
  outputFields: ExtractedField[];
  inputLabel?: string;
  outputLabel?: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-border bg-ice p-6 text-left">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
          {inputLabel}
        </p>
        <div className="rounded border border-border bg-white p-4 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-graphite">
          {inputText}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-ice p-6 text-left">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-muted">
          {outputLabel}
        </p>
        <div className="space-y-2.5 rounded border border-border bg-white p-4">
          {outputFields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between gap-2"
            >
              <div>
                <span className="text-xs font-medium text-slate-muted">
                  {field.label}
                </span>
                <p className="font-[family-name:var(--font-mono)] text-sm text-graphite">
                  {field.value}
                </p>
              </div>
              <ConfidenceDot confidence={field.confidence} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
