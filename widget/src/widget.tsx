/** @jsxImportSource preact */
import { h, render } from "preact";
import { useState, useRef, useEffect, useMemo } from "preact/hooks";

type WidgetState =
  | "idle"
  | "composing"
  | "extracting"
  | "review"
  | "followup"
  | "confirming"
  | "done";

type ExtractedField = { value: unknown; confidence: number };
type ExtractionResult = {
  submission_id: string;
  status: string;
  fields: Record<string, ExtractedField>;
  extras: Record<string, unknown>;
  missing_required: string[];
  warnings: string[];
};

type WidgetConfig = {
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    fontFamily?: string;
  };
  copy?: {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    buttonText?: string;
  };
  behavior?: {
    position?: "inline" | "bottom-right" | "bottom-left";
    fileUpload?: boolean;
    maxFileSize?: number;
    acceptedFileTypes?: string[];
  };
};

const DEFAULT_CONFIG: Required<
  Pick<WidgetConfig, "theme" | "copy">
> = {
  theme: {
    primaryColor: "#2563EB",
    backgroundColor: "#FAFCFE",
    textColor: "#1A2332",
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  copy: {
    title: "Tell us what's going on",
    subtitle: "",
    placeholder: "Describe your situation in your own words...",
    buttonText: "Submit",
  },
};

function SiftWidget({
  schemaId,
  apiKey,
  apiUrl,
  initialConfig,
  initialDescription,
}: {
  schemaId: string;
  apiKey: string;
  apiUrl: string;
  initialConfig: WidgetConfig;
  initialDescription: string;
}) {
  const [state, setState] = useState<WidgetState>("idle");
  const [text, setText] = useState("");
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [followupValues, setFollowupValues] = useState<Record<string, string>>(
    {}
  );
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Resolve config with defaults
  const resolved = useMemo(() => {
    const cfg = initialConfig;
    const theme = { ...DEFAULT_CONFIG.theme, ...cfg.theme };
    const copy = { ...DEFAULT_CONFIG.copy, ...cfg.copy };
    // Use description as subtitle default if no explicit subtitle
    if (!copy.subtitle && initialDescription) {
      copy.subtitle = initialDescription;
    }
    return { theme, copy };
  }, [initialConfig, initialDescription]);

  // Build scoped styles from resolved config
  const s = useMemo(() => {
    const t = resolved.theme;
    return {
      container: {
        fontFamily: t.fontFamily,
        border: "1px solid #E2E8F0",
        borderRadius: `${t.borderRadius}px`,
        overflow: "hidden",
        maxWidth: "480px",
        backgroundColor: t.backgroundColor,
        fontSize: "14px",
        color: t.textColor,
        lineHeight: "1.5",
      },
      header: {
        padding: "12px 16px",
        borderBottom: "1px solid #E2E8F0",
        backgroundColor: "#F0F4F8",
      },
      headerText: {
        fontWeight: "600",
        fontSize: "14px",
        color: t.textColor,
      },
      subtitle: {
        fontSize: "12px",
        color: "#64748B",
        marginTop: "4px",
      },
      body: {
        padding: "16px",
      },
      textareaWrap: {
        position: "relative" as const,
      },
      textarea: {
        width: "100%",
        border: "1px solid #E2E8F0",
        borderRadius: `${Math.max(t.borderRadius! - 2, 4)}px`,
        padding: "10px 40px 10px 12px",
        fontSize: "14px",
        fontFamily: "inherit",
        resize: "vertical" as const,
        outline: "none",
        color: t.textColor,
        backgroundColor: "#fff",
        boxSizing: "border-box" as const,
      },
      voiceBtn: {
        position: "absolute" as const,
        right: "8px",
        top: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "18px",
        padding: "4px",
        borderRadius: "4px",
        color: "#64748B",
      },
      submitBtn: {
        width: "100%",
        marginTop: "10px",
        padding: "10px",
        backgroundColor: t.primaryColor,
        color: "#fff",
        border: "none",
        borderRadius: `${Math.max(t.borderRadius! - 2, 4)}px`,
        fontWeight: "500",
        fontSize: "14px",
        cursor: "pointer",
      },
      input: {
        width: "100%",
        border: "1px solid #E2E8F0",
        borderRadius: `${Math.max(t.borderRadius! - 2, 4)}px`,
        padding: "8px 12px",
        fontSize: "14px",
        outline: "none",
        color: t.textColor,
        marginTop: "4px",
        boxSizing: "border-box" as const,
      },
      center: {
        textAlign: "center" as const,
        padding: "20px 0",
      },
      spinner: {
        width: "24px",
        height: "24px",
        border: "2px solid #E2E8F0",
        borderTopColor: t.primaryColor,
        borderRadius: "50%",
        animation: "sift-spin 0.6s linear infinite",
        margin: "0 auto",
      },
      muted: {
        color: "#64748B",
        fontSize: "13px",
        marginTop: "8px",
      },
      error: {
        padding: "8px 12px",
        backgroundColor: "#FEF2F2",
        border: "1px solid #FECACA",
        borderRadius: `${Math.max(t.borderRadius! - 2, 4)}px`,
        color: "#DC2626",
        fontSize: "13px",
        marginBottom: "12px",
      },
      fieldList: {
        marginTop: "12px",
      },
      field: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid #F0F4F8",
      },
      fieldLabel: {
        fontSize: "11px",
        fontWeight: "500",
        color: "#64748B",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        flex: "0 0 auto",
      },
      fieldValue: {
        flex: "1",
        textAlign: "right" as const,
        fontFamily: '"Fragment Mono", monospace',
        fontSize: "13px",
        marginLeft: "8px",
      },
      dot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        marginLeft: "8px",
        flexShrink: "0",
      },
      checkmark: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#16A34A",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
        margin: "0 auto",
      },
      linkBtn: {
        background: "none",
        border: "none",
        color: t.primaryColor,
        cursor: "pointer",
        fontSize: "13px",
        marginTop: "12px",
        textDecoration: "underline",
      },
      footer: {
        padding: "8px 16px",
        borderTop: "1px solid #E2E8F0",
        textAlign: "center" as const,
      },
      footerLink: {
        color: "#94A3B8",
        fontSize: "11px",
        textDecoration: "none",
      },
    };
  }, [resolved]);

  async function handleSubmit() {
    if (!text.trim()) return;
    setState("extracting");
    setError("");

    try {
      const res = await fetch(`${apiUrl}/api/v1/extract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ text, schema_id: schemaId }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Extraction failed");
        setState("composing");
        return;
      }

      const data: ExtractionResult = await res.json();
      setResult(data);

      if (data.missing_required.length > 0) {
        setState("followup");
      } else {
        setState("done");
      }
    } catch {
      setError("Connection failed. Please try again.");
      setState("composing");
    }
  }

  async function handleConfirm() {
    if (!result) return;
    setState("confirming");

    try {
      const res = await fetch(`${apiUrl}/api/v1/submissions/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          submission_id: result.submission_id,
          fields: followupValues,
        }),
      });

      if (res.ok) {
        setState("done");
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed");
        setState("followup");
      }
    } catch {
      setError("Connection failed");
      setState("followup");
    }
  }

  function toggleVoice() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setError("Voice input not supported in this browser");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setState("composing");
  }

  function reset() {
    setState("idle");
    setText("");
    setResult(null);
    setFollowupValues({});
    setError("");
  }

  const headerTitle =
    state === "done"
      ? "Submitted"
      : state === "extracting"
      ? "Analyzing..."
      : resolved.copy.title;

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <span style={s.headerText}>{headerTitle}</span>
        {resolved.copy.subtitle &&
          (state === "idle" || state === "composing") && (
            <div style={s.subtitle}>{resolved.copy.subtitle}</div>
          )}
      </div>

      {/* Body */}
      <div style={s.body}>
        {error && <div style={s.error}>{error}</div>}

        {(state === "idle" || state === "composing") && (
          <div>
            <div style={s.textareaWrap}>
              <textarea
                value={text}
                onInput={(e) => {
                  setText((e.target as HTMLTextAreaElement).value);
                  if (state === "idle") setState("composing");
                }}
                placeholder={resolved.copy.placeholder}
                style={s.textarea}
                rows={5}
              />
              <button
                onClick={toggleVoice}
                style={{
                  ...s.voiceBtn,
                  ...(listening ? { color: "#DC2626" } : {}),
                }}
                title={listening ? "Stop recording" : "Start voice input"}
              >
                {listening ? "⏹" : "🎤"}
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              style={{
                ...s.submitBtn,
                ...(!text.trim() ? { opacity: 0.5 } : {}),
              }}
            >
              {resolved.copy.buttonText}
            </button>
          </div>
        )}

        {state === "extracting" && (
          <div style={s.center}>
            <div style={s.spinner} />
            <p style={s.muted}>Extracting your data...</p>
          </div>
        )}

        {state === "review" && result && (
          <div>
            <div style={s.fieldList}>
              {Object.entries(result.fields)
                .filter(([, f]) => f.value !== null)
                .map(([key, field]) => (
                  <div key={key} style={s.field}>
                    <span style={s.fieldLabel}>{key}</span>
                    <span style={s.fieldValue}>
                      {String(field.value)}
                    </span>
                    <span
                      style={{
                        ...s.dot,
                        backgroundColor:
                          field.confidence >= 0.8
                            ? "#16A34A"
                            : field.confidence >= 0.5
                            ? "#E6A817"
                            : "#DC2626",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {state === "followup" && result && (
          <div>
            <p style={s.muted}>
              We need a few more details:
            </p>
            {/* Show extracted fields first */}
            <div style={s.fieldList}>
              {Object.entries(result.fields)
                .filter(([, f]) => f.value !== null)
                .map(([key, field]) => (
                  <div key={key} style={s.field}>
                    <span style={s.fieldLabel}>{key}</span>
                    <span style={s.fieldValue}>
                      {String(field.value)}
                    </span>
                    <span
                      style={{
                        ...s.dot,
                        backgroundColor: "#16A34A",
                      }}
                    />
                  </div>
                ))}
            </div>
            {/* Missing required fields */}
            {result.missing_required.map((fieldName) => (
              <div key={fieldName} style={{ marginTop: "8px" }}>
                <label style={s.fieldLabel}>{fieldName} *</label>
                <input
                  type="text"
                  value={followupValues[fieldName] || ""}
                  onInput={(e) =>
                    setFollowupValues({
                      ...followupValues,
                      [fieldName]: (e.target as HTMLInputElement).value,
                    })
                  }
                  style={s.input}
                  placeholder={`Enter your ${fieldName}`}
                />
              </div>
            ))}
            <button
              onClick={handleConfirm}
              disabled={result.missing_required.some(
                (f) => !followupValues[f]?.trim()
              )}
              style={{
                ...s.submitBtn,
                ...(result.missing_required.some(
                  (f) => !followupValues[f]?.trim()
                )
                  ? { opacity: 0.5 }
                  : {}),
              }}
            >
              Complete submission
            </button>
          </div>
        )}

        {state === "confirming" && (
          <div style={s.center}>
            <div style={s.spinner} />
            <p style={s.muted}>Submitting...</p>
          </div>
        )}

        {state === "done" && (
          <div style={s.center}>
            <div style={s.checkmark}>✓</div>
            <p style={{ ...s.muted, marginTop: "8px" }}>
              Thank you! Your information has been submitted.
            </p>
            <button onClick={reset} style={s.linkBtn}>
              Submit another
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <a
          href="https://siftforms.com"
          target="_blank"
          rel="noopener noreferrer"
          style={s.footerLink}
        >
          Powered by Sift
        </a>
      </div>
    </div>
  );
}

// ─── Bootstrap ───
async function initWidget() {
  const scripts = document.querySelectorAll(
    'script[data-schema-id][data-api-key]'
  );

  for (const script of scripts) {
    const schemaId = script.getAttribute("data-schema-id")!;
    const apiKey = script.getAttribute("data-api-key")!;
    const apiUrl =
      script.getAttribute("data-api-url") || "https://siftforms.com";

    // Fetch widget config from API
    let config: WidgetConfig = {};
    let description = "";
    try {
      const res = await fetch(
        `${apiUrl}/api/v1/widget-config/${schemaId}`
      );
      if (res.ok) {
        const data = await res.json();
        config = data.config || {};
        description = data.description || "";
      }
    } catch {
      // Silently fall back to defaults
    }

    // Create container
    const container = document.createElement("div");
    container.id = `sift-widget-${schemaId}`;
    script.parentNode?.insertBefore(container, script.nextSibling);

    // Shadow DOM for style isolation
    const shadow = container.attachShadow({ mode: "open" });

    // Add spinner animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sift-spin {
        to { transform: rotate(360deg); }
      }
    `;
    shadow.appendChild(style);

    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);

    render(
      <SiftWidget
        schemaId={schemaId}
        apiKey={apiKey}
        apiUrl={apiUrl}
        initialConfig={config}
        initialDescription={description}
      />,
      mountPoint
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}
