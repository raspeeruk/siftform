"use client";

import { useEffect, useState } from "react";

type Webhook = {
  id: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  consecutiveFailures: number;
  lastDeliveredAt: string | null;
  createdAt: string;
};

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [newSecret, setNewSecret] = useState<string | null>(null);

  useEffect(() => {
    loadWebhooks();
  }, []);

  function loadWebhooks() {
    fetch("/api/dashboard/webhooks")
      .then((r) => r.json())
      .then(setWebhooks)
      .finally(() => setLoading(false));
  }

  async function createWebhook() {
    setCreating(true);
    const res = await fetch("/api/dashboard/webhooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: newUrl }),
    });
    const data = await res.json();
    if (res.ok) {
      setNewSecret(data.secret);
      setNewUrl("");
      loadWebhooks();
    }
    setCreating(false);
  }

  async function deleteWebhook(id: string) {
    await fetch(`/api/dashboard/webhooks?id=${id}`, { method: "DELETE" });
    loadWebhooks();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            Webhooks
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            Deliver submission data to your systems in real-time
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreate(true);
            setNewSecret(null);
          }}
          className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
        >
          Add webhook
        </button>
      </div>

      {showCreate && (
        <div className="rounded-lg border border-signal/20 bg-signal-light/20 p-5 space-y-4">
          {newSecret ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-graphite">
                Webhook created! Save the signing secret — you won&apos;t see it
                again.
              </p>
              <div className="rounded-md bg-deep p-3">
                <code className="block break-all font-[family-name:var(--font-mono)] text-xs text-green-400">
                  {newSecret}
                </code>
              </div>
              <p className="text-xs text-slate-muted">
                Payloads are signed with HMAC-SHA256. Verify using the{" "}
                <code className="font-[family-name:var(--font-mono)]">
                  X-Sift-Signature
                </code>{" "}
                header.
              </p>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setNewSecret(null);
                }}
                className="rounded border border-border px-3 py-1.5 text-xs font-medium text-graphite"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-slate-muted">
                  Endpoint URL
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://your-app.com/webhooks/sift"
                  className="w-full rounded-md border border-border bg-white px-3 py-1.5 text-sm text-graphite focus:border-signal focus:outline-none"
                />
              </div>
              <button
                onClick={createWebhook}
                disabled={!newUrl || creating}
                className="rounded-md bg-signal px-4 py-1.5 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-muted">
          Loading...
        </div>
      ) : webhooks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-ice p-12 text-center">
          <p className="text-sm text-slate-muted">
            No webhooks configured. Add one to receive submission data.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {webhooks.map((wh) => (
            <div
              key={wh.id}
              className="rounded-lg border border-border bg-ice p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-sm text-graphite">
                    {wh.url}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-muted">
                    <span className="flex items-center gap-1">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          wh.isActive ? "bg-verified" : "bg-alert"
                        }`}
                      />
                      {wh.isActive ? "Active" : "Disabled"}
                    </span>
                    {wh.consecutiveFailures > 0 && (
                      <span className="text-warning">
                        {wh.consecutiveFailures} consecutive failures
                      </span>
                    )}
                    {wh.lastDeliveredAt && (
                      <span>
                        Last delivery:{" "}
                        {new Date(wh.lastDeliveredAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteWebhook(wh.id)}
                  className="text-xs text-alert hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-border bg-ice p-5 text-xs text-slate-muted space-y-2">
        <p className="font-medium text-graphite text-sm">Delivery details:</p>
        <ul className="space-y-1">
          <li>Payloads signed with HMAC-SHA256 via X-Sift-Signature header</li>
          <li>Retry with exponential backoff: 0s, 30s, 2min, 10min, 1hr</li>
          <li>Auto-disabled after 10 consecutive failures</li>
        </ul>
      </div>
    </div>
  );
}
