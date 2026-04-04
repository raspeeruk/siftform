/** @jsxImportSource preact */
import { h, render } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";

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

function SiftWidget({
  schemaId,
  apiKey,
  apiUrl,
}: {
  schemaId: string;
  apiKey: string;
  apiUrl: string;
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerText}>
          {state === "done"
            ? "Submitted"
            : state === "extracting"
            ? "Analyzing..."
            : "Tell us what's going on"}
        </span>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {error && <div style={styles.error}>{error}</div>}

        {(state === "idle" || state === "composing") && (
          <div>
            <div style={styles.textareaWrap}>
              <textarea
                value={text}
                onInput={(e) => {
                  setText((e.target as HTMLTextAreaElement).value);
                  if (state === "idle") setState("composing");
                }}
                placeholder="Describe your situation in your own words..."
                style={styles.textarea}
                rows={5}
              />
              <button
                onClick={toggleVoice}
                style={{
                  ...styles.voiceBtn,
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
                ...styles.submitBtn,
                ...(!text.trim() ? { opacity: 0.5 } : {}),
              }}
            >
              Submit
            </button>
          </div>
        )}

        {state === "extracting" && (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.muted}>Extracting your data...</p>
          </div>
        )}

        {state === "review" && result && (
          <div>
            <div style={styles.fieldList}>
              {Object.entries(result.fields)
                .filter(([, f]) => f.value !== null)
                .map(([key, field]) => (
                  <div key={key} style={styles.field}>
                    <span style={styles.fieldLabel}>{key}</span>
                    <span style={styles.fieldValue}>
                      {String(field.value)}
                    </span>
                    <span
                      style={{
                        ...styles.dot,
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
            <p style={styles.muted}>
              We need a few more details:
            </p>
            {/* Show extracted fields first */}
            <div style={styles.fieldList}>
              {Object.entries(result.fields)
                .filter(([, f]) => f.value !== null)
                .map(([key, field]) => (
                  <div key={key} style={styles.field}>
                    <span style={styles.fieldLabel}>{key}</span>
                    <span style={styles.fieldValue}>
                      {String(field.value)}
                    </span>
                    <span
                      style={{
                        ...styles.dot,
                        backgroundColor: "#16A34A",
                      }}
                    />
                  </div>
                ))}
            </div>
            {/* Missing required fields */}
            {result.missing_required.map((fieldName) => (
              <div key={fieldName} style={{ marginTop: "8px" }}>
                <label style={styles.fieldLabel}>{fieldName} *</label>
                <input
                  type="text"
                  value={followupValues[fieldName] || ""}
                  onInput={(e) =>
                    setFollowupValues({
                      ...followupValues,
                      [fieldName]: (e.target as HTMLInputElement).value,
                    })
                  }
                  style={styles.input}
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
                ...styles.submitBtn,
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
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.muted}>Submitting...</p>
          </div>
        )}

        {state === "done" && (
          <div style={styles.center}>
            <div style={styles.checkmark}>✓</div>
            <p style={{ ...styles.muted, marginTop: "8px" }}>
              Thank you! Your information has been submitted.
            </p>
            <button onClick={reset} style={styles.linkBtn}>
              Submit another
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <a
          href="https://siftform.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.footerLink}
        >
          Powered by Sift
        </a>
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    overflow: "hidden",
    maxWidth: "480px",
    backgroundColor: "#FAFCFE",
    fontSize: "14px",
    color: "#1A2332",
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
  },
  body: {
    padding: "16px",
  },
  textareaWrap: {
    position: "relative",
  },
  textarea: {
    width: "100%",
    border: "1px solid #E2E8F0",
    borderRadius: "6px",
    padding: "10px 40px 10px 12px",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    color: "#1A2332",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  voiceBtn: {
    position: "absolute",
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
    backgroundColor: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    fontSize: "14px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    border: "1px solid #E2E8F0",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    outline: "none",
    color: "#1A2332",
    marginTop: "4px",
    boxSizing: "border-box",
  },
  center: {
    textAlign: "center",
    padding: "20px 0",
  },
  spinner: {
    width: "24px",
    height: "24px",
    border: "2px solid #E2E8F0",
    borderTopColor: "#2563EB",
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
    borderRadius: "6px",
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
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    flex: "0 0 auto",
  },
  fieldValue: {
    flex: "1",
    textAlign: "right",
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
    color: "#2563EB",
    cursor: "pointer",
    fontSize: "13px",
    marginTop: "12px",
    textDecoration: "underline",
  },
  footer: {
    padding: "8px 16px",
    borderTop: "1px solid #E2E8F0",
    textAlign: "center",
  },
  footerLink: {
    color: "#94A3B8",
    fontSize: "11px",
    textDecoration: "none",
  },
};

// ─── Bootstrap ───
function initWidget() {
  const scripts = document.querySelectorAll(
    'script[data-schema-id][data-api-key]'
  );

  scripts.forEach((script) => {
    const schemaId = script.getAttribute("data-schema-id")!;
    const apiKey = script.getAttribute("data-api-key")!;
    const apiUrl =
      script.getAttribute("data-api-url") || "https://siftform.com";

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
      <SiftWidget schemaId={schemaId} apiKey={apiKey} apiUrl={apiUrl} />,
      mountPoint
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}
