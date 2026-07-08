"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

/** Page and source attribution captured at submit time. SSR-safe. */
function currentAttribution() {
  if (typeof window === "undefined") return { page: "", source: "" };
  const params = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .map((key) => params.get(key)?.trim())
    .filter(Boolean)
    .join("/");
  return { page: window.location.pathname, source: utm || "footer" };
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const website =
      (form.elements.namedItem("website") as HTMLInputElement | null)?.value ??
      "";

    setStatus("sending");
    setError("");

    try {
      const { page, source } = currentAttribution();
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, page, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(
          typeof data.error === "string"
            ? data.error
            : "Could not subscribe right now"
        );
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Could not subscribe right now");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-graphite" role="status">
        You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-auto">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-graphite placeholder:text-slate-muted focus:border-signal focus:outline-none sm:w-64"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-60"
        >
          {status === "sending" ? "Joining..." : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
