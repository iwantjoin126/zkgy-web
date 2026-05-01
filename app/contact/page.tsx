import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "../components";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "联系我们 - 中康国悦",
  description: "联系中康国悦，地址位于山西晋城经济开发区人工智能产业园，获取园区招商、运营管理与产业服务解决方案。",
};

const contactCards = [
  {
    label: "联系电话",
    title: "156 8231 9128",
    body: "招商咨询、运营合作与项目对接，可直接来电沟通。",
    href: "tel:15682319128",
    action: "拨打电话",
  },
  {
    label: "办公地址",
    title: "山西晋城经济开发区人工智能产业园",
    body: "面向入驻企业、合作伙伴与产业资源方提供现场接待。",
    href: "#location",
    action: "查看地图",
  },
  {
    label: "服务响应",
    title: "1 个工作日内反馈",
    body: "提交需求后，我们会根据项目类型安排专人跟进。",
    href: "#contact-form",
    action: "在线留言",
  },
];

export default function Contact() {
  return (
    <PageShell inverseHeader>
      <header style={{ position: "relative", minHeight: "clamp(560px, 76vh, 760px)", color: "var(--color-text-inverse)", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Image
          src="/assets/contact-park-cooperation-hero.png"
          alt="园区合作洽谈场景"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 44%", transform: "scale(1.06)" }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(9,9,9,0.78) 0%, rgba(9,9,9,0.58) 38%, rgba(9,9,9,0.22) 70%, rgba(9,9,9,0.1) 100%)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(17,17,17,0.22), rgba(17,17,17,0) 38%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "var(--space-5)", paddingBottom: "var(--space-5)" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="eyebrow" style={{ color: "rgba(250,250,250,0.68)", marginBottom: "var(--space-1)" }}>CONTACT US</div>
            <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-2)", maxWidth: 620 }}>高效沟通，合作共赢</h1>
            <p className="subheading" style={{ color: "rgba(250,250,250,0.78)", maxWidth: 610, marginBottom: "var(--space-2)", lineHeight: 1.7 }}>
              欢迎联系我们，获取定制化园区运营与招商服务解决方案。我们专注于高效管理与资源整合，助力企业发展。
            </p>
            <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
              <Link className="btn btn-on-inverse" href="#contact-form">在线咨询</Link>
              <a className="btn btn-secondary-on-inverse" href="tel:15682319128">电话联系</a>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingBottom: "var(--space-3)" }}>
        <div className="container contact-info-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-15)" }}>
          {contactCards.map((card) => (
            <article key={card.label} style={{ background: "var(--color-bg-secondary)", borderRadius: "var(--radius-card)", padding: "var(--space-2)", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "var(--space-15)" }}>
              <div>
                <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>{card.label}</div>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", lineHeight: 1.2, marginBottom: "var(--space-1)" }}>{card.title}</h2>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-base)", lineHeight: 1.7 }}>{card.body}</p>
              </div>
              <Link href={card.href} className="btn btn-secondary" style={{ alignSelf: "flex-start" }}>{card.action}</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="location" className="section">
        <div className="container contact-map-grid" style={{ display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: "var(--space-3)", alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>LOCATION</div>
            <h2 style={{ marginBottom: "var(--space-1)" }}>山西晋城经开区核心位置</h2>
            <p className="paragraph-large" style={{ lineHeight: 1.8, marginBottom: "var(--space-2)" }}>
              办公地址位于山西晋城经济开发区人工智能产业园，面向产业资源、入驻企业与合作伙伴提供专业对接服务。
            </p>
            <div style={{ borderLeft: "3px solid var(--color-action-blue)", paddingLeft: "var(--space-1)", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              <strong style={{ display: "block", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>详细地址</strong>
              山西晋城经济开发区人工智能产业园
            </div>
          </div>
          <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--color-border-primary)", background: "var(--color-bg-secondary)" }}>
            <Image
              src="/assets/contact-jincheng-ai-park-map.png"
              alt="山西晋城经济开发区人工智能产业园位置示意图"
              width={1672}
              height={941}
              sizes="(max-width: 768px) 100vw, 58vw"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section id="contact-form" className="section">
        <div className="container contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", alignItems: "start" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>ONLINE MESSAGE</div>
            <h2 style={{ marginBottom: "var(--space-2)" }}>留下需求，专人对接</h2>
            <p className="paragraph-large" style={{ lineHeight: 1.8 }}>欢迎咨询园区招商与运营服务。<br />请填写表单，我们将尽快与您联系，提供专业定制化解决方案。</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
