import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { inputStyle, PageShell } from "../components";

export const metadata: Metadata = {
  title: "联系我们 - 中康国悦",
  description: "欢迎联系中康国悦，获取定制化园区运营与招商服务解决方案。我们专注于高效管理与资源整合，助力企业发展。",
};

export default function Contact() {
  return (
    <PageShell inverseHeader>
      <header style={{ backgroundColor: "var(--color-bg-inverse)", color: "var(--color-text-inverse)", overflow: "hidden", paddingBottom: "var(--space-5)" }}>
        <div className="container" style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-3)", textAlign: "center" }}>
          <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-2)" }}>高效沟通，合作共赢</h1>
          <p className="subheading" style={{ color: "rgba(250,250,250,0.72)", maxWidth: 640, margin: "0 auto var(--space-2)", lineHeight: 1.7 }}>
            欢迎联系我们，获取定制化园区运营与招商服务解决方案。我们专注于高效管理与资源整合，助力企业发展。
          </p>
          <div style={{ display: "flex", gap: "var(--space-1)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-on-inverse" href="#contact-form">在线咨询</Link>
            <a className="btn btn-secondary-on-inverse" href="tel:15682319128">电话联系</a>
          </div>
        </div>
        <div className="container">
          <div style={{ position: "relative", width: "100%", paddingTop: "48%", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
            <Image src="/assets/contact-hero-sign.avif" alt="每日一签" fill priority sizes="(max-width: 768px) 100vw, 1200px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </header>

      <section id="contact-form" className="section">
        <div className="container contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", alignItems: "start" }}>
          <div>
            <h2 style={{ marginBottom: "var(--space-2)" }}>高效对接，合作共赢</h2>
            <p className="paragraph-large" style={{ lineHeight: 1.8 }}>欢迎咨询园区招商与运营服务。<br />请填写表单，我们将尽快与您联系，提供专业定制化解决方案。</p>
          </div>
          <form style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            <div className="contact-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-1)" }}>
              <div>
                <label htmlFor="contact-name" style={labelStyle}>姓名</label>
                <input id="contact-name" type="text" placeholder="您的大名" required style={compactInputStyle} />
              </div>
              <div>
                <label htmlFor="contact-phone" style={labelStyle}>电话</label>
                <input id="contact-phone" type="tel" placeholder="联系电话" required style={compactInputStyle} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="contact-email" style={labelStyle}>邮箱</label>
                <input id="contact-email" type="email" placeholder="Email" style={compactInputStyle} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="contact-message" style={labelStyle}>留言</label>
                <textarea id="contact-message" placeholder="有什么能帮到您" rows={4} maxLength={5000} required style={{ ...compactInputStyle, minHeight: 128, resize: "vertical" }} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start", minWidth: 132 }}>现在提交</button>
          </form>
        </div>
      </section>
    </PageShell>
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
  ...inputStyle,
  flex: "initial",
  padding: "0.62rem 0.9rem",
  minHeight: 42,
};
