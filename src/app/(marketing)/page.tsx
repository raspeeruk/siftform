import Link from "next/link";
import type { Metadata } from "next";
import { ExtractionDemo } from "@/components/pseo/extraction-demo";
import { TemplateCard } from "@/components/pseo/template-card";
import { pseoTemplates } from "@/lib/pseo/templates";
import {
  createMetadata,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/pseo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Turn Unstructured Text into Structured Data",
  description:
    "Replace forms with natural language. Users describe their situation, AI extracts the data you need. Embed anywhere with one line of code.",
  path: "/",
});

const USE_CASE_TABS = [
  {
    id: "support",
    label: "Support",
    input:
      "Hi, I'm Sarah Chen and I need help with a billing issue. My account number is AC-2847 and I was charged $149.99 twice on March 15th. My email is sarah.chen@gmail.com. This is really frustrating because I've been a customer for 3 years.",
    output: [
      { label: "Name", value: "Sarah Chen", confidence: 0.98 },
      { label: "Email", value: "sarah.chen@gmail.com", confidence: 0.99 },
      { label: "Account", value: "AC-2847", confidence: 0.95 },
      { label: "Issue", value: "Double charge", confidence: 0.88 },
      { label: "Amount", value: "$149.99", confidence: 0.96 },
      { label: "Date", value: "2024-03-15", confidence: 0.92 },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    input:
      "My name is David Park and I need to talk to someone about a wrongful termination. I was let go from Acme Corp on February 3rd after reporting safety violations. I have documentation of everything. My number is 415-555-0189 and email is dpark@email.com. This is urgent.",
    output: [
      { label: "Client", value: "David Park", confidence: 0.98 },
      { label: "Case Type", value: "Wrongful Termination", confidence: 0.92 },
      { label: "Employer", value: "Acme Corp", confidence: 0.97 },
      { label: "Termination Date", value: "2024-02-03", confidence: 0.94 },
      { label: "Phone", value: "415-555-0189", confidence: 0.99 },
      { label: "Urgency", value: "Urgent", confidence: 0.91 },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    input:
      "I need to file a claim for a car accident. It happened yesterday at the intersection of 5th and Main. Someone ran a red light and hit my Honda Civic. Policy number is HM-8834921. No one was injured but my front bumper and hood are totaled. Probably $4,000-5,000 in damage.",
    output: [
      { label: "Claim Type", value: "Auto", confidence: 0.97 },
      { label: "Policy", value: "HM-8834921", confidence: 0.99 },
      { label: "Location", value: "5th and Main", confidence: 0.93 },
      { label: "Vehicle", value: "Honda Civic", confidence: 0.96 },
      { label: "Injuries", value: "No", confidence: 0.95 },
      { label: "Est. Damage", value: "$4,000–$5,000", confidence: 0.88 },
    ],
  },
  {
    id: "leads",
    label: "Lead Intake",
    input:
      "Hi there, I'm the operations manager at Greenfield Properties. We manage about 200 units and we're drowning in maintenance requests coming in through email. Looking for a solution in the $50-100/mo range. Could we set up a demo this week? Reach me at james@greenfieldprop.com.",
    output: [
      { label: "Name", value: "James (Operations Manager)", confidence: 0.87 },
      { label: "Company", value: "Greenfield Properties", confidence: 0.98 },
      { label: "Scale", value: "200 units", confidence: 0.96 },
      { label: "Pain Point", value: "Maintenance requests via email", confidence: 0.91 },
      { label: "Budget", value: "$50–$100/mo", confidence: 0.94 },
      { label: "Email", value: "james@greenfieldprop.com", confidence: 0.99 },
    ],
  },
  {
    id: "bugs",
    label: "Bug Reports",
    input:
      "The export button on the submissions page isn't working. When I click it, it spins for about 10 seconds then shows a blank page. I'm on Chrome 124 on macOS. This started happening after your update yesterday. I have 2,000+ submissions and need to export them for a client report by Friday.",
    output: [
      { label: "Component", value: "Submissions export", confidence: 0.96 },
      { label: "Behavior", value: "Spinner then blank page", confidence: 0.93 },
      { label: "Browser", value: "Chrome 124, macOS", confidence: 0.98 },
      { label: "Trigger", value: "Recent update", confidence: 0.85 },
      { label: "Severity", value: "High", confidence: 0.88 },
      { label: "Deadline", value: "Friday", confidence: 0.92 },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    input:
      "Just switched from Typeform last month and honestly this is so much better. The AI extraction is surprisingly accurate for our intake forms. Only complaint is the dashboard could be faster when loading lots of submissions — sometimes takes 3-4 seconds. Would rate 8/10. Would definitely recommend.",
    output: [
      { label: "Sentiment", value: "Positive", confidence: 0.95 },
      { label: "Previous Tool", value: "Typeform", confidence: 0.99 },
      { label: "Positive", value: "AI extraction accuracy", confidence: 0.92 },
      { label: "Issue", value: "Dashboard loading speed", confidence: 0.90 },
      { label: "Rating", value: "8/10", confidence: 0.99 },
      { label: "Would Recommend", value: "Yes", confidence: 0.97 },
    ],
  },
];

const INTEGRATION_LOGOS = [
  "Zapier",
  "Slack",
  "HubSpot",
  "Google Sheets",
  "Jira",
  "Notion",
  "Zendesk",
  "Salesforce",
];

export default function HomePage() {
  const topTemplates = pseoTemplates.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationJsonLd(),
            softwareApplicationJsonLd(),
          ]),
        }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-signal">
              Forms are broken
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-graphite sm:text-6xl font-[family-name:var(--font-heading)]">
              Turn text into
              <br />
              <span className="text-signal">structured data</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-muted">
              Users describe their situation in plain English. AI extracts
              exactly the fields you need. Embed anywhere with one line of code.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="rounded-md bg-signal px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-signal-dark"
              >
                Start extracting data
              </Link>
              <Link
                href="#demo"
                className="rounded-md border border-border bg-ice px-6 py-3 text-sm font-medium text-graphite hover:bg-polar"
              >
                See it work
              </Link>
            </div>
          </div>
        </section>

        {/* Use Case Tabs Demo */}
        <section id="demo" className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              AI extraction in action
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-muted">
              Every industry, every use case. Users write naturally — Sift
              extracts the structure.
            </p>
            <UseCaseTabs />
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Three steps. Five minutes.
            </h2>
            <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-signal/20">
                  01
                </span>
                <h3 className="mt-2 text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
                  Define your form
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  Name, email, issue type — whatever fields matter to your
                  business. Pick a template or build from scratch.
                </p>
              </div>
              <div>
                <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-signal/20">
                  02
                </span>
                <h3 className="mt-2 text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
                  Embed the widget
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  One script tag. Works on any website. Shadow DOM means zero
                  style conflicts.
                </p>
              </div>
              <div>
                <span className="font-[family-name:var(--font-mono)] text-3xl font-bold text-signal/20">
                  03
                </span>
                <h3 className="mt-2 text-base font-bold text-graphite font-[family-name:var(--font-heading)]">
                  Data flows in
                </h3>
                <p className="mt-1 text-sm text-slate-muted">
                  Structured submissions land in your dashboard and fire
                  webhooks to your systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embed anywhere */}
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="grid items-center gap-12 sm:grid-cols-2">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
                  Embed anywhere
                </h2>
                <p className="mt-3 text-slate-muted">
                  One script tag adds an AI-powered text input to any page.
                  Shadow DOM isolation means it works alongside your existing
                  styles without conflicts.
                </p>
                <div className="mt-6 rounded-lg bg-deep p-4">
                  <code className="font-[family-name:var(--font-mono)] text-xs text-green-400">
                    {`<script src="https://siftforms.com/widget.js"`}
                    <br />
                    {`  data-schema="your-schema-id"`}
                    <br />
                    {`  data-key="pk_live_..."></script>`}
                  </code>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-ice p-8">
                <div className="rounded-md border border-dashed border-signal/30 bg-white p-6 text-center">
                  <p className="text-sm text-slate-muted">
                    Your website
                  </p>
                  <div className="mx-auto mt-4 max-w-xs rounded border border-signal/20 bg-signal-light/10 p-3">
                    <p className="text-xs font-medium text-signal">
                      Sift Widget
                    </p>
                    <div className="mt-2 rounded bg-white p-2">
                      <p className="text-left text-[11px] text-slate-muted">
                        Describe your situation...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Template gallery preview */}
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
                  Ready-made templates
                </h2>
                <p className="mt-2 text-slate-muted">
                  Start with a proven template. Customise any field.
                </p>
              </div>
              <Link
                href="/templates"
                className="hidden text-sm font-medium text-signal hover:text-signal-dark sm:block"
              >
                View all templates &rarr;
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topTemplates.map((t) => (
                <TemplateCard
                  key={t.slug}
                  slug={t.slug}
                  name={t.name}
                  description={t.description}
                  category={t.category}
                  fieldCount={t.fields.length}
                />
              ))}
            </div>
            <Link
              href="/templates"
              className="mt-6 block text-center text-sm font-medium text-signal hover:text-signal-dark sm:hidden"
            >
              View all templates &rarr;
            </Link>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Simple pricing
            </h2>
            <p className="mt-3 text-slate-muted">
              Start for free. Upgrade when you need more extractions.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-4">
              {[
                { name: "Free", price: "$0", desc: "50 extractions/mo" },
                { name: "Starter", price: "$29", desc: "500 extractions/mo" },
                {
                  name: "Growth",
                  price: "$79",
                  desc: "2,000 extractions/mo",
                  popular: true,
                },
                { name: "Scale", price: "$199", desc: "10,000 extractions/mo" },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-lg border p-6 ${
                    plan.popular
                      ? "border-signal bg-signal-light/10"
                      : "border-border bg-ice"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-muted">
                    {plan.name}
                  </p>
                  <p className="mt-2 text-3xl font-black text-graphite font-[family-name:var(--font-heading)]">
                    {plan.price}
                    <span className="text-sm font-normal text-slate-muted">
                      /mo
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slate-muted">{plan.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/pricing"
              className="mt-8 inline-block text-sm font-medium text-signal hover:text-signal-dark"
            >
              See full pricing &rarr;
            </Link>
          </div>
        </section>

        {/* Integrations */}
        <section className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-muted">
              Works with your stack
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {INTEGRATION_LOGOS.map((name) => (
                <Link
                  key={name}
                  href="/integrations"
                  className="font-[family-name:var(--font-mono)] text-sm text-slate-muted transition hover:text-graphite"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-ice px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
              Stop building forms.
              <br />
              Start extracting data.
            </h2>
            <p className="mt-4 text-slate-muted">
              Set up your first form in under 5 minutes. Free tier included —
              no credit card required.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block rounded-md bg-signal px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-signal-dark"
            >
              Try Sift free — 50 extractions/mo
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function UseCaseTabs() {
  return <UseCaseTabsClient tabs={USE_CASE_TABS} />;
}

// Client component for tab interactivity
import { UseCaseTabsClient } from "./use-case-tabs-client";
