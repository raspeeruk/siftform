import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation — Sift",
  description: "Sift API reference for text and file extraction.",
};

export default function ApiDocsPage() {
  return (
    <main className="flex-1 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
          API Documentation
        </h1>
        <p className="mt-2 text-sm text-slate-muted">
          Base URL:{" "}
          <code className="font-[family-name:var(--font-mono)] text-signal">
            https://siftform.com/api/v1
          </code>
        </p>

        <div className="mt-8 space-y-10">
          {/* Auth */}
          <Section title="Authentication">
            <p>
              Include your API key in the <code>Authorization</code> header:
            </p>
            <Code>{`Authorization: Bearer iq_live_xxxxxxxxxxxxx`}</Code>
            <p>
              <strong>Key types:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <code>iq_pub_</code> — Public keys for widget embedding. Can
                only call extract + confirm.
              </li>
              <li>
                <code>iq_live_</code> — Secret keys for API access. Full access
                to all endpoints.
              </li>
            </ul>
          </Section>

          {/* Extract text */}
          <Section title="POST /extract" badge="Text Extraction">
            <p>Extract structured data from plain text.</p>
            <Code>{`curl -X POST https://siftform.com/api/v1/extract \\
  -H "Authorization: Bearer iq_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hi, I\\'m Sarah Chen, email sarah@gmail.com. I have a billing issue with account AC-2847.",
    "schema_id": "your-schema-uuid"
  }'`}</Code>
            <h4 className="mt-4 font-medium">Response</h4>
            <Code>{`{
  "submission_id": "uuid",
  "status": "completed",
  "fields": {
    "customer_name": { "value": "Sarah Chen", "confidence": 0.98 },
    "email": { "value": "sarah@gmail.com", "confidence": 0.99 },
    "account_id": { "value": "AC-2847", "confidence": 0.95 },
    "issue_type": { "value": "Billing", "confidence": 0.92 }
  },
  "extras": {
    "sentiment": "frustrated"
  },
  "missing_required": [],
  "overall_confidence": 0.96,
  "warnings": []
}`}</Code>
          </Section>

          {/* Extract file */}
          <Section title="POST /extract/file" badge="File Extraction">
            <p>
              Upload an image or PDF. Sift extracts text via AI vision, then maps
              to your schema.
            </p>
            <Code>{`curl -X POST https://siftform.com/api/v1/extract/file \\
  -H "Authorization: Bearer iq_live_xxx" \\
  -F "file=@receipt.jpg" \\
  -F "schema_id=your-schema-uuid"`}</Code>
            <p className="text-sm text-slate-muted">
              Accepted: JPEG, PNG, GIF, WebP, PDF. Max 10MB.
            </p>
          </Section>

          {/* Confirm */}
          <Section title="POST /submissions/confirm" badge="Follow-up">
            <p>
              Complete a pending submission by providing missing required fields.
            </p>
            <Code>{`curl -X POST https://siftform.com/api/v1/submissions/confirm \\
  -H "Authorization: Bearer iq_pub_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "submission_id": "uuid",
    "fields": { "email": "sarah@gmail.com" }
  }'`}</Code>
          </Section>

          {/* List */}
          <Section title="GET /submissions" badge="List">
            <p>List submissions with optional filters.</p>
            <Code>{`GET /submissions?schema_id=uuid&status=completed&from=2024-01-01&page=1&limit=50`}</Code>
            <p className="text-sm text-slate-muted">
              Requires a <code>iq_live_</code> key.
            </p>
          </Section>

          {/* Detail */}
          <Section title="GET /submissions/:id" badge="Detail">
            <p>Get full submission detail including extracted data, extras, and warnings.</p>
            <p className="text-sm text-slate-muted">
              Requires a <code>iq_live_</code> key.
            </p>
          </Section>

          {/* Webhooks */}
          <Section title="Webhooks">
            <p>
              Configure webhooks in the dashboard. Payloads are signed with
              HMAC-SHA256.
            </p>
            <Code>{`// Verify signature
const crypto = require('crypto');
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(rawBody)
  .digest('hex');
const isValid = signature === headers['x-sift-signature'];`}</Code>
            <p className="text-sm text-slate-muted">
              Retries: 0s, 30s, 2min, 10min, 1hr. Auto-disables after 10
              consecutive failures.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-8">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-graphite font-[family-name:var(--font-heading)]">
          {title}
        </h2>
        {badge && (
          <span className="rounded bg-signal-light px-2 py-0.5 text-[10px] font-medium text-signal">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-3 text-sm text-graphite [&_code]:rounded [&_code]:bg-polar [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-[family-name:var(--font-mono)] [&_code]:text-xs [&_ul]:text-sm [&_p]:text-sm">
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
