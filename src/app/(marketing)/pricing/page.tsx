import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Sift",
  description:
    "Start free with 50 AI extractions/month. Upgrade for more volume, forms, and API access.",
};

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Try Sift with zero commitment",
    cta: "Sign up free",
    features: [
      "50 extractions/month",
      "1 form",
      "Widget embedding",
      "Email support",
    ],
    notIncluded: ["Webhooks", "API access", "Unlimited forms"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    description: "For small teams getting started",
    cta: "Start with Starter",
    features: [
      "500 extractions/month",
      "3 forms",
      "1 webhook",
      "Email support",
      "Widget embedding",
    ],
    notIncluded: ["API access", "Unlimited forms"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$79",
    description: "For growing businesses",
    popular: true,
    cta: "Start with Growth",
    features: [
      "2,000 extractions/month",
      "Unlimited forms",
      "5 webhooks",
      "Full API access",
      "Priority support",
      "Widget embedding",
    ],
    notIncluded: [],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$199",
    description: "For high-volume operations",
    cta: "Start with Scale",
    features: [
      "10,000 extractions/month",
      "Unlimited forms",
      "Unlimited webhooks",
      "Full API access",
      "Priority support",
      "Widget embedding",
      "Custom branding (coming soon)",
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-graphite sm:text-5xl font-[family-name:var(--font-heading)]">
          Simple pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-muted">
          Start for free. Upgrade when you need more extractions.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border p-8 text-left ${
                plan.popular
                  ? "border-signal bg-signal-light/10 shadow-sm"
                  : "border-border bg-ice"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-muted">
                {plan.description}
              </p>
              <p className="mt-6">
                <span className="text-4xl font-black text-graphite font-[family-name:var(--font-heading)]">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-muted">/month</span>
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-graphite">{f}</span>
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-muted/60"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.id === "free" ? "/login" : `/login?plan=${plan.id}`}
                className={`mt-8 block w-full rounded-md px-4 py-2.5 text-center text-sm font-medium transition ${
                  plan.popular
                    ? "bg-signal text-white hover:bg-signal-dark"
                    : "border border-border bg-white text-graphite hover:bg-polar"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Unit economics */}
        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-border bg-ice p-8 text-left">
          <h2 className="text-lg font-bold text-graphite font-[family-name:var(--font-heading)]">
            How extraction pricing works
          </h2>
          <p className="mt-2 text-sm text-slate-muted">
            One extraction = one piece of text or file processed through AI and
            mapped to your form fields. Playground usage is free and unlimited.
            Extractions reset at the start of each billing period.
          </p>
        </div>
      </div>
    </main>
  );
}
