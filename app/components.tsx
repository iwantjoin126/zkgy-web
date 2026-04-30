import Image from "next/image";
import Link from "next/link";

const navItems = [
  ["解决方案", "/coming-soon"],
  ["园区服务", "/coming-soon"],
  ["产业服务", "/coming-soon"],
  ["晋城", "/coming-soon"],
  ["深圳", "/coming-soon"],
  ["关于我们", "/about"],
  ["常见问题", "/faq"],
] as const;

export function Header({ inverse = false }: { inverse?: boolean }) {
  return (
    <nav
      style={{
        position: "relative",
        zIndex: 99,
        width: "100%",
        backgroundColor: inverse ? "var(--color-bg-inverse)" : "#fff",
        color: inverse ? "var(--color-text-inverse)" : "var(--color-text-primary)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "var(--space-1)",
          paddingBottom: "var(--space-1)",
          gap: "var(--space-2)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
          <span style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/assets/logo.jpeg" alt="中康国悦 logo" width={36} height={36} style={{ objectFit: "cover" }} />
          </span>
          <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>中康国悦</span>
        </Link>
        <div className="desktop-nav" style={{ alignItems: "center", gap: "var(--space-05)", flex: 1, justifyContent: "center" }}>
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: "var(--text-base)", padding: "0.4rem 0.75rem", opacity: 0.9 }}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", flexShrink: 0 }}>
          <Link className="btn btn-primary" style={{ fontSize: "0.9rem", padding: "0.55em 1.2em" }} href="/contact">
            立即咨询
          </Link>
          <button className="mobile-menu-btn" aria-label="菜单" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: "0.4rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="5" x2="21" y2="5" />
              <line x1="3" y1="19" x2="21" y2="19" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  const columns = [
    ["服务板块", "招商", "运营", "管理", "咨询"],
    ["解决方案", "定制", "产研", "政策", "资源"],
    ["关于我们", "团队", "愿景", "使命", "招聘"],
    ["客户服务", "帮助", "活动", "新闻", "联系"],
  ];
  return (
    <footer className="section-inverse" style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-4)" }}>
      <div className="container">
        <div className="footer-links-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-2)", marginBottom: "var(--space-4)", paddingBottom: "var(--space-3)", borderBottom: "1px solid rgba(250,250,250,0.1)" }}>
          {columns.map(([title, ...links]) => (
            <ul key={title} style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "var(--space-1)" }}>
                <h3 style={{ fontSize: "var(--text-xs)", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(250,250,250,0.45)", margin: 0 }}>{title}</h3>
              </li>
              {links.map((link) => (
                <li key={link} style={{ marginBottom: "0.4rem" }}>
                  <Link style={{ color: "rgba(250,250,250,0.75)", fontSize: "var(--text-base)" }} href="/coming-soon">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="footer-bottom" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "var(--space-2)" }}>
          <div style={{ fontSize: "var(--text-sm)", color: "rgba(250,250,250,0.4)" }}>版权所有 © 2024 中康国悦(晋城)</div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--color-text-inverse)" }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
              <Image src="/assets/logo.jpeg" alt="logo" fill sizes="32px" style={{ objectFit: "cover" }} />
            </span>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, letterSpacing: "0.06em" }}>中康国悦科技发展</span>
          </Link>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "var(--space-1)", justifyContent: "flex-end" }}>
            {["微信", "微博", "抖音", "领英", "视频号"].map((label) => (
              <li key={label}>
                <Link aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", color: "rgba(250,250,250,0.55)", border: "1px solid rgba(250,250,250,0.12)" }} href="#">
                  <span style={{ fontSize: 12 }}>{label.slice(0, 1)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function ContactMiniForm({ idPrefix = "form" }: { idPrefix?: string }) {
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
        <input id={`${idPrefix}-name`} type="text" placeholder="姓名" required style={inputStyle} />
        <input id={`${idPrefix}-email`} type="email" placeholder="Email" required style={inputStyle} />
      </div>
      <textarea id={`${idPrefix}-message`} placeholder="请输入您想咨询的内容（选填）" rows={3} maxLength={5000} style={{ ...inputStyle, resize: "vertical", minHeight: 104 }} />
      <div style={{ textAlign: "center" }}>
        <button type="submit" className="btn btn-primary">
          现在提交
        </button>
      </div>
    </form>
  );
}

export const inputStyle: React.CSSProperties = {
  flex: "1 1 200px",
  width: "100%",
  minWidth: 0,
  padding: "0.7rem 1rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border-primary)",
  fontSize: "var(--text-base)",
  backgroundColor: "var(--color-bg-primary)",
  color: "var(--color-text-primary)",
  outline: "none",
};

export function PageShell({ children, inverseHeader = false }: { children: React.ReactNode; inverseHeader?: boolean }) {
  return (
    <>
      <Header inverse={inverseHeader} />
      {children}
      <Footer />
    </>
  );
}
