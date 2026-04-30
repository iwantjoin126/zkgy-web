"use client";

import { FormEvent, useState } from "react";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: "正在提交..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ status: "loading", message: "正在提交..." });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      }),
    }).catch(() => null);

    if (!response) {
      setState({ status: "error", message: "网络异常，请稍后再试。" });
      return;
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setState({ status: "error", message: result.error || "提交失败，请检查信息后重试。" });
      return;
    }

    form.reset();
    setState({ status: "success", message: result.message || "咨询信息已收到。" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      <div className="contact-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-1)" }}>
        <div>
          <label htmlFor="contact-name" style={labelStyle}>姓名</label>
          <input id="contact-name" name="name" type="text" placeholder="您的大名" required style={compactInputStyle} />
        </div>
        <div>
          <label htmlFor="contact-phone" style={labelStyle}>电话</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="联系电话" required style={compactInputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="contact-email" style={labelStyle}>邮箱</label>
          <input id="contact-email" name="email" type="email" placeholder="Email" style={compactInputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="contact-message" style={labelStyle}>留言</label>
          <textarea id="contact-message" name="message" placeholder="有什么能帮到您" rows={4} maxLength={5000} required style={{ ...compactInputStyle, minHeight: 128, resize: "vertical" }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-primary" disabled={state.status === "loading"} style={{ minWidth: 132 }}>
          {state.status === "loading" ? "提交中" : "现在提交"}
        </button>
        {state.message ? (
          <p
            aria-live="polite"
            style={{
              margin: 0,
              color: state.status === "error" ? "#c62828" : "var(--color-text-secondary)",
              fontSize: "var(--text-sm)",
            }}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  marginBottom: "0.35rem",
};

const compactInputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  padding: "0.62rem 0.9rem",
  minHeight: 42,
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border-primary)",
  fontSize: "var(--text-base)",
  backgroundColor: "var(--color-bg-primary)",
  color: "var(--color-text-primary)",
  outline: "none",
};
