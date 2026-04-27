"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          topic: data.get("topic"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        router.push("/contact/thanks");
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-signal mb-3">
        Contact
      </p>
      <h1 className="text-4xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
        Get in touch.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-muted">
        Sales, support, partnerships, integrations — drop us a line and we&apos;ll
        respond within one business day.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.15em] text-graphite mb-2"
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-border bg-white px-4 py-3 text-graphite focus:border-signal focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.15em] text-graphite mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-border bg-white px-4 py-3 text-graphite focus:border-signal focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.15em] text-graphite mb-2"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full border border-border bg-white px-4 py-3 text-graphite focus:border-signal focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="topic"
            className="block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.15em] text-graphite mb-2"
          >
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            className="w-full border border-border bg-white px-4 py-3 text-graphite focus:border-signal focus:outline-none"
          >
            <option value="general">General enquiry</option>
            <option value="sales">Sales / pricing</option>
            <option value="support">Support</option>
            <option value="integration">Integration question</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.15em] text-graphite mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full border border-border bg-white px-4 py-3 text-graphite focus:border-signal focus:outline-none"
          />
        </div>

        {error && (
          <p className="font-[family-name:var(--font-mono)] text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-signal px-8 py-3 text-sm font-medium text-white hover:bg-signal/90 transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </main>
  );
}
