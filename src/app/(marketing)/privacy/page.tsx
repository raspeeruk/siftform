import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sift Forms",
  description:
    "How Sift Forms collects, uses, and protects your data, and the service providers we work with.",
  alternates: { canonical: "https://siftforms.com/privacy" },
};

const PROCESSORS = [
  {
    name: "Netlify",
    purpose: "Application hosting and content delivery",
  },
  {
    name: "Neon",
    purpose: "Database hosting for account and submission data",
  },
  {
    name: "Resend",
    purpose: "Transactional email (sign-in links, service notices)",
  },
  {
    name: "Anthropic",
    purpose: "AI processing of submitted text to extract structured data",
  },
  {
    name: "Stripe",
    purpose: "Payment processing for paid plans",
  },
  {
    name: "MailerLite",
    purpose: "Product updates and marketing email to account holders",
  },
  {
    name: "Google Analytics",
    purpose: "Aggregate website usage statistics",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-muted">Last updated: 2 July 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-graphite">
        <section>
          <h2 className="text-lg font-bold">Who we are</h2>
          <p className="mt-2">
            Sift Forms (siftforms.com) is an AI form and data extraction
            service. For data you give us about yourself, such as your account
            email, we act as the data controller. For content submitted through
            forms and widgets that our customers embed on their own sites, we
            act as a processor on behalf of that customer, who remains the
            controller of their end users&apos; data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">What we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Account data: your email address, optional name, and sign-in
              activity.
            </li>
            <li>
              Service data: the schemas you create and the submissions
              processed through them, including any personal data your end
              users include in those submissions.
            </li>
            <li>
              Billing data: handled by Stripe. We never see or store full card
              details.
            </li>
            <li>
              Usage data: aggregate analytics about how the website is used.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold">How we use it</h2>
          <p className="mt-2">
            We use your data to run the service: signing you in, processing
            submissions with AI to extract structured fields, delivering
            results to your dashboard and webhooks, and billing paid plans. We
            may also send account holders emails about the product, such as
            onboarding tips and feature updates. Every marketing email includes
            an unsubscribe link, and opting out never affects your account or
            transactional email such as sign-in links.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Service providers</h2>
          <p className="mt-2">
            We share data only with the providers needed to operate the
            service:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {PROCESSORS.map((p) => (
              <li key={p.name}>
                <span className="font-medium">{p.name}</span>: {p.purpose}
              </li>
            ))}
          </ul>
          <p className="mt-2">
            We do not sell personal data, and we do not share it with anyone
            else except where the law requires it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Retention</h2>
          <p className="mt-2">
            Account data is kept while your account is active. Submission data
            is kept so you can access it in your dashboard, and is deleted when
            you delete it, delete the schema it belongs to, or close your
            account. Backups expire on a rolling basis.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Your rights</h2>
          <p className="mt-2">
            Depending on where you live, you may have rights to access,
            correct, export, or delete your personal data, and to object to or
            restrict certain processing. To exercise any of these, or to ask
            anything about this policy, use the{" "}
            <a href="/contact" className="text-signal underline">
              contact form
            </a>{" "}
            and we will respond promptly. If you are in the UK or EU you also
            have the right to complain to your data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Changes</h2>
          <p className="mt-2">
            If we make material changes to this policy we will update this
            page and note the new date above.
          </p>
        </section>
      </div>
    </main>
  );
}
