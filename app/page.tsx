import Image from "next/image";
import Link from "next/link";
import { PageShell } from "./components";

const testimonials = [
  ["团队响应迅速，助力园区招商高效，运营管理井然有序。", "招商经理", "/assets/avatar-1.jpg"],
  ["服务流程规范，定制方案助力企业快速落地，资源整合能力突出。", "运营总监", "/assets/avatar-2.jpg"],
  ["沟通顺畅，专业团队为园区发展提供有力支持，值得信赖。", "项目负责人", "/assets/avatar-3.jpg"],
];

const faqs = [
  ["园区运营服务包含哪些？", "我们提供招商引资、日常管理、资源整合及企业服务等全方位支持，助力企业高效发展。"],
  ["如何定制园区解决方案？", "根据企业需求，量身定制招商、管理及配套服务，实现资源优化配置与产业集聚。"],
  ["入驻流程是怎样的？", "企业可通过咨询、实地考察、签约入驻等流程，享受一站式服务，快速落地园区。"],
  ["园区如何支持企业创新？", "我们整合创新资源，提供政策对接、技术支持及合作平台，助力企业持续创新与成长。"],
];

export default function Home() {
  return (
    <PageShell>
      <main>
        <header className="section section-inverse" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-6)" }}>
          <div className="container">
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", alignItems: "center" }}>
              <div className="aspect-square" style={{ borderRadius: "var(--radius-card)", overflow: "hidden", position: "relative", maxWidth: 560 }}>
                <Image src="/assets/hero-bg.avif" alt="园区背景" fill priority sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)", maskImage: "linear-gradient(to right, black 60%, transparent 100%)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)" }}>赋能园区高质量发展</h1>
                <p className="subheading" style={{ maxWidth: "38rem", color: "rgba(250,250,250,0.72)", lineHeight: 1.7 }}>
                  专注园区招商与管理，定制高效解决方案，推动资源整合与创新升级。
                </p>
                <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
                  <Link className="btn btn-primary" href="/coming-soon">了解详情</Link>
                  <Link className="btn btn-secondary-inverse" href="/contact">联系我们</Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="section section-accent">
          <div className="container features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center" }}>
            <div>
              <h2 className="heading-h2" style={{ color: "#fff", marginBottom: "var(--space-1)", whiteSpace: "pre-line" }}>专业赋能产业生态{"\n"}创新驱动园区价值</h2>
              <p className="subheading" style={{ color: "rgba(255,255,255,0.76)" }}>创新驱动 合作共赢 诚信务实</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-15)", color: "rgba(255,255,255,0.62)", fontWeight: 700 }}>
              {["招商", "运营", "管理", "咨询", "政策", "金融"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
              <h2 className="heading-h2" style={{ marginBottom: "0.5rem" }}>客户信赖的真实见证</h2>
              <p className="subheading">企业客户评价，见证专业服务</p>
            </div>
            <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-2)" }}>
              {testimonials.map(([quote, role, avatar]) => (
                <div key={role} style={{ display: "flex", flexDirection: "column", padding: "var(--space-2)", borderRadius: "var(--radius-card)", backgroundColor: "var(--color-bg-secondary)", gap: "var(--space-15)" }}>
                  <p style={{ fontSize: "var(--text-lg)", lineHeight: 1.7, margin: 0, flex: 1 }}>{quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                    <span style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <Image src={avatar} alt="" fill sizes="52px" style={{ objectFit: "cover" }} />
                    </span>
                    <span>
                      <strong style={{ display: "block", fontSize: "var(--text-sm)" }}>中康国悦</strong>
                      <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>{role}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-inverse">
          <div className="container faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--space-4)", alignItems: "start" }}>
            <div>
              <div className="eyebrow" style={{ color: "rgba(250,250,250,0.56)", marginBottom: "var(--space-1)" }}>常见问题</div>
              <h2 style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-1)" }}>高效园区运营问答</h2>
              <p className="subheading" style={{ color: "rgba(250,250,250,0.68)" }}>了解园区管理与定制服务，快速获取所需信息，轻松解决疑问。</p>
            </div>
            <div>
              {faqs.map(([q, a]) => (
                <div className="divider" key={q} style={{ borderBottomColor: "rgba(250,250,250,0.16)", paddingBlock: "var(--space-2)" }}>
                  <div className="faq-item-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--space-2)" }}>
                    <h3 style={{ fontSize: "var(--text-h4)", margin: 0 }}>{q}</h3>
                    <p style={{ fontSize: "var(--text-lg)", color: "rgba(250,250,250,0.68)", margin: 0 }}>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container cta-grid" style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr", gap: "var(--space-2)", alignItems: "center" }}>
            <div style={{ textAlign: "center", padding: "0 var(--space-2)" }}>
              <h2 className="heading-h1" style={{ marginBottom: "var(--space-1)" }}>高效园区运营新动力</h2>
              <p className="subheading" style={{ marginBottom: "var(--space-2)" }}>定制园区解决方案，提升资源整合与创新发展，助力企业高效成长。</p>
              <Link className="btn btn-primary" href="/contact">立即咨询</Link>
            </div>
            {["/assets/gallery-1.avif", "/assets/gallery-2.avif"].map((src, i) => (
              <div className="aspect-square" key={src} style={{ borderRadius: "var(--radius-card)", overflow: "hidden", position: "relative" }}>
                <Image src={src} alt={i === 0 ? "园区实景" : "园区活动"} fill sizes="(max-width: 768px) 100vw, 224px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
