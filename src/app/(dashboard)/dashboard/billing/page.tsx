"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    extractions: "50",
    schemas: "1",
    webhooks: "0",
    api: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    extractions: "500",
    schemas: "3",
    webhooks: "1",
    api: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$79",
    extractions: "2,000",
    schemas: "Unlimited",
    webhooks: "5",
    api: true,
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$199",
    extractions: "10,000",
    schemas: "Unlimited",
    webhooks: "Unlimited",
    api: true,
  },
];

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [currentPlan, setCurrentPlan] = useState("free");
  const [usage, setUsage] = useState({ used: 0, limit: 50 });
  const [loading, setLoading] = useState<string | null>(null);
  const success = searchParams.get("success") === "true";
  const checkoutPlan = searchParams.get("checkout");
  const [autoCheckoutDone, setAutoCheckoutDone] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((r) => r.json())
      .then((data) => {
        if (data.usage) {
          setCurrentPlan(data.usage.plan);
          setUsage({ used: data.usage.used, limit: data.usage.limit });
        }
      });
  }, []);

  // Auto-trigger Stripe checkout if ?checkout=plan is present (from signup flow)
  useEffect(() => {
    if (
      checkoutPlan &&
      ["starter", "growth", "scale"].includes(checkoutPlan) &&
      !autoCheckoutDone &&
      !success
    ) {
      setAutoCheckoutDone(true);
      handleSubscribe(checkoutPlan);
    }
  }, [checkoutPlan]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubscribe(plan: string) {
    setLoading(plan);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  async function handleManageBilling() {
    setLoading("portal");
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Billing
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Manage your subscription and usage
        </p>
      </div>

      {success && (
        <div className="rounded-md border border-verified/30 bg-verified/5 px-4 py-3 text-sm text-verified">
          Subscription activated! Your plan is now active.
        </div>
      )}

      {/* Current usage */}
      <div className="rounded-lg border border-border bg-ice p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
              Current plan
            </p>
            <p className="mt-1 text-xl font-black capitalize text-graphite font-[family-name:var(--font-heading)]">
              {currentPlan}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">
              Usage this period
            </p>
            <p className="mt-1 text-xl font-black text-graphite font-[family-name:var(--font-heading)]">
              {usage.used}{" "}
              <span className="text-sm font-normal text-slate-muted">
                / {usage.limit}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-polar">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min((usage.used / usage.limit) * 100, 100)}%`,
              backgroundColor:
                usage.used / usage.limit > 0.9
                  ? "#DC2626"
                  : usage.used / usage.limit > 0.7
                  ? "#D97706"
                  : "#2563EB",
            }}
          />
        </div>
        {currentPlan !== "free" && (
          <button
            onClick={handleManageBilling}
            disabled={loading === "portal"}
            className="mt-4 text-sm text-signal hover:underline"
          >
            {loading === "portal" ? "Loading..." : "Manage billing"}
          </button>
        )}
      </div>

      {/* Plans */}
      <div className="grid gap-4 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          return (
            <div
              key={plan.id}
              className={`relative rounded-lg border p-6 ${
                plan.popular
                  ? "border-signal bg-signal-light/10"
                  : "border-border bg-ice"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-signal px-2 py-0.5 text-[10px] font-medium text-white">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
                {plan.name}
              </h3>
              <p className="mt-1">
                <span className="text-3xl font-black text-graphite font-[family-name:var(--font-heading)]">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-muted">/month</span>
              </p>

              <ul className="mt-4 space-y-2 text-sm text-graphite">
                <li className="flex items-center gap-2">
                  <Check />
                  {plan.extractions} extractions
                </li>
                <li className="flex items-center gap-2">
                  <Check />
                  {plan.schemas} schema{plan.schemas !== "1" ? "s" : ""}
                </li>
                <li className="flex items-center gap-2">
                  <Check />
                  {plan.webhooks} webhook{plan.webhooks !== "1" ? "s" : ""}
                </li>
                <li
                  className={`flex items-center gap-2 ${
                    !plan.api ? "text-slate-muted" : ""
                  }`}
                >
                  {plan.api ? <Check /> : <X />}
                  API access
                </li>
              </ul>

              <button
                onClick={() => plan.id !== "free" && handleSubscribe(plan.id)}
                disabled={isCurrent || loading === plan.id || plan.id === "free"}
                className={`mt-6 w-full rounded-md px-4 py-2 text-sm font-medium transition ${
                  isCurrent
                    ? "border border-border bg-polar text-slate-muted cursor-default"
                    : plan.id === "free"
                    ? "border border-border bg-polar text-slate-muted cursor-default"
                    : plan.popular
                    ? "bg-signal text-white hover:bg-signal-dark"
                    : "border border-border bg-white text-graphite hover:bg-polar"
                }`}
              >
                {isCurrent
                  ? "Current plan"
                  : plan.id === "free"
                  ? "Free"
                  : loading === plan.id
                  ? "Loading..."
                  : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg
      className="h-4 w-4 text-verified"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function X() {
  return (
    <svg
      className="h-4 w-4 text-slate-muted/50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
