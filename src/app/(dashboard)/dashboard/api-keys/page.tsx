"use client";

import { useEffect, useState } from "react";

type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  type: string;
  lastUsedAt: string | null;
  isRevoked: boolean;
  createdAt: string;
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState<"pub" | "live">("pub");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadKeys();
  }, []);

  function loadKeys() {
    fetch("/api/dashboard/api-keys")
      .then((r) => r.json())
      .then(setKeys)
      .finally(() => setLoading(false));
  }

  async function createKey() {
    setCreating(true);
    const res = await fetch("/api/dashboard/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newKeyName, type: newKeyType }),
    });
    const data = await res.json();
    if (res.ok) {
      setCreatedKey(data.key);
      setNewKeyName("");
      loadKeys();
    }
    setCreating(false);
  }

  async function revokeKey(id: string) {
    await fetch(`/api/dashboard/api-keys?id=${id}`, { method: "DELETE" });
    loadKeys();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-graphite font-[family-name:var(--font-heading)]">
            API Keys
          </h1>
          <p className="mt-1 text-sm text-slate-muted">
            Manage keys for widget embedding and API access
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreate(true);
            setCreatedKey(null);
          }}
          className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white hover:bg-signal-dark"
        >
          Create key
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="rounded-lg border border-signal/20 bg-signal-light/20 p-5 space-y-4">
          {createdKey ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-graphite">
                Key created! Copy it now — you won&apos;t see it again.
              </p>
              <div className="rounded-md bg-deep p-3">
                <code className="block break-all font-[family-name:var(--font-mono)] text-sm text-green-400">
                  {createdKey}
                </code>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(createdKey);
                }}
                className="rounded bg-signal px-3 py-1.5 text-xs font-medium text-white"
              >
                Copy to clipboard
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setCreatedKey(null);
                }}
                className="ml-2 rounded border border-border px-3 py-1.5 text-xs font-medium text-graphite"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-slate-muted">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production Widget"
                  className="w-full rounded-md border border-border bg-white px-3 py-1.5 text-sm text-graphite focus:border-signal focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-muted">
                  Type
                </label>
                <select
                  value={newKeyType}
                  onChange={(e) =>
                    setNewKeyType(e.target.value as "pub" | "live")
                  }
                  className="rounded-md border border-border bg-white px-3 py-1.5 text-sm text-graphite focus:border-signal focus:outline-none"
                >
                  <option value="pub">Public (widget)</option>
                  <option value="live">Live (API)</option>
                </select>
              </div>
              <button
                onClick={createKey}
                disabled={!newKeyName || creating}
                className="rounded-md bg-signal px-4 py-1.5 text-sm font-medium text-white hover:bg-signal-dark disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Keys list */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-muted">
          Loading...
        </div>
      ) : keys.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-ice p-12 text-center">
          <p className="text-sm text-slate-muted">
            No API keys yet. Create one to embed the widget or use the API.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-ice">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-polar/50 text-left">
                <th className="px-4 py-2.5 font-medium text-slate-muted">
                  Name
                </th>
                <th className="px-4 py-2.5 font-medium text-slate-muted">
                  Key
                </th>
                <th className="px-4 py-2.5 font-medium text-slate-muted">
                  Type
                </th>
                <th className="px-4 py-2.5 font-medium text-slate-muted">
                  Last Used
                </th>
                <th className="px-4 py-2.5 font-medium text-slate-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr
                  key={key.id}
                  className={`border-b border-border last:border-0 ${
                    key.isRevoked ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-4 py-2.5 text-graphite">{key.name}</td>
                  <td className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs text-slate-muted">
                    {key.keyPrefix}...
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        key.type === "pub"
                          ? "bg-signal-light text-signal"
                          : "bg-extract-light text-warning"
                      }`}
                    >
                      {key.type === "pub" ? "Public" : "Live"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-muted">
                    {key.lastUsedAt
                      ? new Date(key.lastUsedAt).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="px-4 py-2.5">
                    {key.isRevoked ? (
                      <span className="text-xs text-alert">Revoked</span>
                    ) : (
                      <button
                        onClick={() => revokeKey(key.id)}
                        className="text-xs text-alert hover:underline"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info box */}
      <div className="rounded-lg border border-border bg-ice p-5 text-sm text-slate-muted">
        <p className="font-medium text-graphite">Key types:</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li>
            <strong>Public (iq_pub_)</strong> — Safe to embed in HTML. Can only
            call extract + confirm endpoints.
          </li>
          <li>
            <strong>Live (iq_live_)</strong> — Keep secret. Full API access
            including listing submissions.
          </li>
        </ul>
      </div>
    </div>
  );
}
