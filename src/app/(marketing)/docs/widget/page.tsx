import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widget Documentation — Sift",
  description: "Embed the Sift widget on any webpage with one script tag.",
};

export default function WidgetDocsPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          Widget Documentation
        </h1>
        <p className="mt-2 text-sm text-slate-muted">
          Embed Sift on any webpage. One script tag. Zero style conflicts.
        </p>

        <div className="mt-8 space-y-8">
          <Section title="Quick Start">
            <p>Add this script tag to your HTML:</p>
            <Code>{`<script
  src="https://siftform.com/widget/v1.js"
  data-schema-id="YOUR_SCHEMA_ID"
  data-api-key="iq_pub_xxxxxxxxxxxxx"
  async
></script>`}</Code>
            <p>
              The widget renders inline, right after the script tag. It uses
              Shadow DOM so your page styles won&apos;t affect it.
            </p>
          </Section>

          <Section title="Configuration">
            <p>Configure the widget via data attributes on the script tag:</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-medium text-slate-muted">
                    Attribute
                  </th>
                  <th className="py-2 pr-4 font-medium text-slate-muted">
                    Required
                  </th>
                  <th className="py-2 font-medium text-slate-muted">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-[family-name:var(--font-mono)] text-xs">
                    data-schema-id
                  </td>
                  <td className="py-2 pr-4">Yes</td>
                  <td className="py-2 text-slate-muted">
                    The UUID of your schema
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-[family-name:var(--font-mono)] text-xs">
                    data-api-key
                  </td>
                  <td className="py-2 pr-4">Yes</td>
                  <td className="py-2 text-slate-muted">
                    Your public API key (iq_pub_)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-[family-name:var(--font-mono)] text-xs">
                    data-api-url
                  </td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2 text-slate-muted">
                    Custom API URL (default: https://siftform.com)
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="How It Works">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                User types (or speaks) their description in the text area
              </li>
              <li>
                AI extracts structured data mapped to your schema fields
              </li>
              <li>
                Extracted fields are displayed with confidence indicators
              </li>
              <li>
                If required fields are missing, the widget shows input fields for
                ONLY those fields
              </li>
              <li>User confirms and data is submitted to your dashboard</li>
            </ol>
          </Section>

          <Section title="Voice Input">
            <p>
              The widget includes a microphone button that uses the Web Speech
              API for voice-to-text input. Users can speak instead of type.
              Supported in Chrome, Edge, and Safari.
            </p>
          </Section>

          <Section title="Shadow DOM">
            <p>
              The widget renders inside a Shadow DOM, which means your page&apos;s
              CSS won&apos;t affect the widget and vice versa. The widget has its own
              self-contained styles.
            </p>
          </Section>

          <Section title="Size">
            <p>
              The widget bundle is{" "}
              <strong>~21KB (8KB gzipped)</strong>. It uses Preact instead of
              React for minimal footprint.
            </p>
          </Section>

          <Section title="State Machine">
            <p>The widget follows a strict state flow:</p>
            <Code>{`idle → composing → extracting → review/followup → confirming → done`}</Code>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>idle</strong>: Empty textarea, waiting for input
              </li>
              <li>
                <strong>composing</strong>: User is typing or speaking
              </li>
              <li>
                <strong>extracting</strong>: AI is processing the text
              </li>
              <li>
                <strong>followup</strong>: Missing required fields need user
                input
              </li>
              <li>
                <strong>done</strong>: Submission confirmed
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-6">
      <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-graphite [&_code]:rounded [&_code]:bg-polar [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-[family-name:var(--font-mono)] [&_code]:text-xs">
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-deep p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-green-400">
      {children}
    </pre>
  );
}
