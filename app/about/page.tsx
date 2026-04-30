import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactMiniForm, PageShell } from "../components";

export const metadata: Metadata = {
  title: "关于我们 - 中康国悦",
  description: "中康国悦致力于成为领先的创新型轻资产园区运营服务商，专注于为园区企业提供全生命周期解决方案。",
};

const cards = [
  ["发展历程", "自成立以来，我们不断优化服务模式，积累丰富的园区运营经验，助力多地产业集聚。", "/assets/about-rubber-stamp.avif", "var(--color-bg-inverse)"],
  ["使命愿景", "通过专业创新的园区运营服务，赋能企业成长，推动区域产业升级与可持续发展。", "/assets/about-glass-luminous.jpeg", "var(--color-accent-primary)"],
  ["核心价值观", "诚信、专业、创新、共赢，始终坚持为客户和合作伙伴创造最大价值。", "/assets/about-hero-edtech.avif", "var(--color-accent-secondary)"],
];

export default function About() {
  return (
    <PageShell inverseHeader>
      <header style={{ backgroundColor: "var(--color-bg-inverse)", color: "var(--color-text-inverse)", overflow: "hidden", paddingBottom: "var(--space-5)" }}>
        <div className="container" style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-3)", textAlign: "center" }}>
          <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-2)" }}>专业赋能产业生态<br />创新驱动园区价值</h1>
          <p className="subheading" style={{ color: "rgba(250,250,250,0.7)", maxWidth: 760, margin: "0 auto var(--space-2)", lineHeight: 1.7 }}>
            我们致力于成为领先的创新型轻资产园区运营服务商，专注于为园区企业提供从初创孵化、成长支持到成熟运营的全生命周期解决方案。
          </p>
          <div style={{ display: "flex", gap: "var(--space-1)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-on-inverse" href="/coming-soon">了解更多</Link>
            <Link className="btn btn-secondary-on-inverse" href="/contact">联系我们</Link>
          </div>
        </div>
        <div className="container">
          <div className="about-hero-images" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-1)" }}>
            {[
              ["/assets/about-about-building.avif", "商场大楼", "40%", "75%"],
              ["/assets/about-history.jpg", "公司历史", "50%", "100%"],
              ["/assets/about-company-front.avif", "公司前台", "40%", "75%"],
            ].map(([src, alt, width, ratio]) => (
              <div key={src} style={{ width, borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <div style={{ position: "relative", width: "100%", paddingTop: ratio }}>
                  <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container about-intro-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-3)", alignItems: "center", marginBottom: "var(--space-5)" }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-05)" }}>公司简介</div>
            <h2 style={{ marginBottom: "var(--space-1)" }}>赋能园区高质量发展</h2>
            <p className="paragraph-large" style={{ marginBottom: "var(--space-2)" }}>我们专注于为产业园区提供定制化招商与运营管理服务，推动资源整合与创新发展，以专业服务推动产业集聚，助力企业成长。</p>
            <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
              <Link className="btn" href="/about">了解我们</Link>
              <Link className="btn btn-secondary" href="/contact">联系我们</Link>
            </div>
          </div>
          <Image src="/assets/about-hero-cycling.webp" alt="户外拓展" width={310} height={200} style={{ borderRadius: "var(--radius-card)", width: "100%", maxWidth: 310, height: "auto", objectFit: "cover" }} />
        </div>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {cards.map(([title, body, src, bg]) => (
            <article key={title} className="about-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", padding: "var(--space-2)", borderRadius: "var(--radius-card)", background: bg, color: "#fff", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "2rem", marginBottom: "var(--space-1)" }}>{title}</h2>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "var(--text-lg)", margin: 0 }}>{body}</p>
              </div>
              <div className="aspect-square" style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
                <Image src={src} alt={title} fill sizes="(max-width: 768px) 100vw, 480px" style={{ objectFit: "cover" }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "var(--color-accent-primary)", padding: "var(--space-5) 0" }}>
        <div className="container">
          <div style={{ backgroundColor: "var(--color-bg-primary)", borderRadius: "var(--radius-card)", padding: "var(--space-4)", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <h2 className="heading-h1" style={{ marginBottom: "var(--space-2)" }}>高效园区运营，轻松订阅</h2>
              <ContactMiniForm idPrefix="about" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
