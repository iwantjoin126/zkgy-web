"use client";

import { FormEvent, useEffect, useState } from "react";

type CustomerMessage = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  source_path: string | null;
  user_agent: string | null;
  created_at: string;
};

type LoadState = "idle" | "loading" | "ready" | "error";

const text = {
  title: "\u54a8\u8be2\u7ba1\u7406",
  subtitle: "\u67e5\u770b\u548c\u5220\u9664\u7f51\u7ad9\u7528\u6237\u63d0\u4ea4\u7684\u54a8\u8be2\u5185\u5bb9\u3002",
  password: "\u540e\u53f0\u5bc6\u7801",
  login: "\u767b\u5f55",
  logout: "\u9000\u51fa",
  refresh: "\u5237\u65b0",
  delete: "\u5220\u9664",
  empty: "\u6682\u65e0\u54a8\u8be2\u8bb0\u5f55\u3002",
  loading: "\u6b63\u5728\u52a0\u8f7d...",
  loginFailed: "\u767b\u5f55\u5931\u8d25\u3002",
  loadFailed: "\u8bfb\u53d6\u5931\u8d25\u3002",
  deleteFailed: "\u5220\u9664\u5931\u8d25\u3002",
  confirmDelete: "\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u54a8\u8be2\u5417\uff1f",
  name: "\u59d3\u540d",
  phone: "\u7535\u8bdd",
  email: "\u90ae\u7bb1",
  message: "\u7559\u8a00",
  submittedAt: "\u63d0\u4ea4\u65f6\u95f4",
  source: "\u6765\u6e90",
};

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [notice, setNotice] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    loadMessages({ silentAuthFailure: true });
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setNotice("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);

    if (!response?.ok) {
      const result = await response?.json().catch(() => ({}));
      setState("error");
      setNotice(result?.error || text.loginFailed);
      return;
    }

    setPassword("");
    setIsAuthed(true);
    await loadMessages();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setIsAuthed(false);
    setMessages([]);
    setState("idle");
  }

  async function loadMessages(options?: { silentAuthFailure?: boolean }) {
    setState("loading");
    const response = await fetch("/api/admin/messages", { cache: "no-store" }).catch(() => null);

    if (response?.status === 401 && options?.silentAuthFailure) {
      setState("idle");
      setIsAuthed(false);
      return;
    }

    if (!response?.ok) {
      const result = await response?.json().catch(() => ({}));
      setState("error");
      setNotice(result?.error || text.loadFailed);
      if (response?.status === 401) {
        setIsAuthed(false);
      }
      return;
    }

    const result = (await response.json()) as { messages?: CustomerMessage[] };
    setMessages(result.messages || []);
    setIsAuthed(true);
    setState("ready");
    setNotice("");
  }

  async function deleteMessage(id: string) {
    if (!window.confirm(text.confirmDelete)) {
      return;
    }

    setDeletingId(id);
    const response = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch(() => null);
    setDeletingId("");

    if (!response?.ok) {
      const result = await response?.json().catch(() => ({}));
      setNotice(result?.error || text.deleteFailed);
      return;
    }

    setMessages((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-2)", flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>Admin</div>
          <h1 className="heading-h1" style={{ marginBottom: "var(--space-1)" }}>{text.title}</h1>
          <p className="paragraph-large" style={{ margin: 0, color: "var(--color-text-secondary)" }}>{text.subtitle}</p>
        </div>
        {isAuthed ? (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="button" className="btn btn-secondary" onClick={() => loadMessages()}>{text.refresh}</button>
            <button type="button" className="btn btn-secondary" onClick={logout}>{text.logout}</button>
          </div>
        ) : null}
      </header>

      {!isAuthed ? (
        <form onSubmit={login} style={{ maxWidth: 420, display: "grid", gap: "var(--space-1)" }}>
          <label htmlFor="admin-password" style={labelStyle}>{text.password}</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={inputStyle}
          />
          <button type="submit" className="btn btn-primary" disabled={state === "loading"} style={{ width: "fit-content" }}>
            {state === "loading" ? text.loading : text.login}
          </button>
        </form>
      ) : (
        <section style={{ display: "grid", gap: "var(--space-1)" }}>
          {state === "loading" ? <p className="paragraph-large">{text.loading}</p> : null}
          {messages.length === 0 && state !== "loading" ? <p className="paragraph-large">{text.empty}</p> : null}
          {messages.map((item) => (
            <article key={item.id} style={messageCardStyle}>
              <div className="admin-message-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.85rem" }}>
                <Info label={text.name} value={item.name} />
                <Info label={text.phone} value={item.phone} />
                <Info label={text.email} value={item.email || "-"} />
              </div>
              <Info label={text.message} value={item.message} large />
              <div className="admin-message-actions" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-1)", alignItems: "end" }}>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <Info label={text.submittedAt} value={formatDate(item.created_at)} />
                  <Info label={text.source} value={item.source_path || "-"} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => deleteMessage(item.id)} disabled={deletingId === item.id}>
                  {deletingId === item.id ? text.loading : text.delete}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {notice ? <p aria-live="polite" style={{ color: "#c62828", margin: 0 }}>{notice}</p> : null}
    </div>
  );
}

function Info({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ ...labelStyle, marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", lineHeight: 1.7, fontSize: large ? "var(--text-base)" : "var(--text-sm)" }}>{value}</div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("zh-CN", { hour12: false });
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "var(--text-sm)",
  fontWeight: 700,
  color: "var(--color-text-secondary)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  padding: "0.72rem 0.9rem",
  minHeight: 44,
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border-primary)",
  fontSize: "var(--text-base)",
  backgroundColor: "var(--color-bg-primary)",
  color: "var(--color-text-primary)",
  outline: "none",
};

const messageCardStyle: React.CSSProperties = {
  display: "grid",
  gap: "var(--space-1)",
  padding: "var(--space-2)",
  border: "1px solid var(--color-border-primary)",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-bg-primary)",
};
