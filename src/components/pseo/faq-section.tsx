"use client";

import { useState } from "react";

export function FAQSection({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <FAQItem key={i} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-ice">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="pr-4 text-sm font-medium text-graphite">
          {question}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4 text-sm text-slate-muted">
          {answer}
        </div>
      )}
    </div>
  );
}
