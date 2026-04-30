import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "../components";
import { ContactForm } from "../contact/contact-form";

export const metadata: Metadata = {
  title: "\u5173\u4e8e\u6211\u4eec - \u4e2d\u5eb7\u56fd\u60a6",
  description:
    "\u4e2d\u5eb7\u56fd\u60a6\u81f4\u529b\u4e8e\u6210\u4e3a\u9886\u5148\u7684\u521b\u65b0\u578b\u8f7b\u8d44\u4ea7\u56ed\u533a\u8fd0\u8425\u670d\u52a1\u5546\uff0c\u4e13\u6ce8\u4e8e\u4e3a\u56ed\u533a\u4f01\u4e1a\u63d0\u4f9b\u5168\u751f\u547d\u5468\u671f\u89e3\u51b3\u65b9\u6848\u3002",
};

const cards = [
  {
    title: "\u53d1\u5c55\u5386\u7a0b",
    body: "\u81ea\u6210\u7acb\u4ee5\u6765\uff0c\u6211\u4eec\u4e0d\u65ad\u4f18\u5316\u670d\u52a1\u6a21\u5f0f\uff0c\u79ef\u7d2f\u4e30\u5bcc\u7684\u56ed\u533a\u8fd0\u8425\u7ecf\u9a8c\uff0c\u52a9\u529b\u591a\u5730\u4ea7\u4e1a\u96c6\u805a\u3002",
    src: "/assets/about-rubber-stamp.avif",
    bg: "var(--color-bg-inverse)",
  },
  {
    title: "\u4f7f\u547d\u613f\u666f",
    body: "\u901a\u8fc7\u4e13\u4e1a\u521b\u65b0\u7684\u56ed\u533a\u8fd0\u8425\u670d\u52a1\uff0c\u8d4b\u80fd\u4f01\u4e1a\u6210\u957f\uff0c\u63a8\u52a8\u533a\u57df\u4ea7\u4e1a\u5347\u7ea7\u4e0e\u53ef\u6301\u7eed\u53d1\u5c55\u3002",
    src: "/assets/about-glass-luminous.jpeg",
    bg: "var(--color-accent-primary)",
  },
  {
    title: "\u6838\u5fc3\u4ef7\u503c\u89c2",
    body: "\u8bda\u4fe1\u3001\u4e13\u4e1a\u3001\u521b\u65b0\u3001\u5171\u8d62\uff0c\u59cb\u7ec8\u575a\u6301\u4e3a\u5ba2\u6237\u548c\u5408\u4f5c\u4f19\u4f34\u521b\u9020\u6700\u5927\u4ef7\u503c\u3002",
    src: "/assets/about-hero-edtech.avif",
    bg: "var(--color-accent-secondary)",
  },
];

const heroImages = [
  { src: "/assets/about-about-building.avif", alt: "\u5546\u52a1\u5927\u697c", width: "40%", ratio: "75%" },
  { src: "/assets/about-history.jpg", alt: "\u516c\u53f8\u5386\u53f2", width: "50%", ratio: "100%" },
  { src: "/assets/about-company-front.avif", alt: "\u516c\u53f8\u524d\u53f0", width: "40%", ratio: "75%" },
];

export default function About() {
  return (
    <PageShell inverseHeader>
      <header style={{ backgroundColor: "var(--color-bg-inverse)", color: "var(--color-text-inverse)", overflow: "hidden", paddingBottom: "var(--space-5)" }}>
        <div className="container" style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-3)", textAlign: "center" }}>
          <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-2)" }}>
            {"\u4e13\u4e1a\u8d4b\u80fd\u4ea7\u4e1a\u751f\u6001"}
            <br />
            {"\u521b\u65b0\u9a71\u52a8\u56ed\u533a\u4ef7\u503c"}
          </h1>
          <p className="subheading" style={{ color: "rgba(250,250,250,0.7)", maxWidth: 760, margin: "0 auto var(--space-2)", lineHeight: 1.7 }}>
            {"\u6211\u4eec\u81f4\u529b\u4e8e\u6210\u4e3a\u9886\u5148\u7684\u521b\u65b0\u578b\u8f7b\u8d44\u4ea7\u56ed\u533a\u8fd0\u8425\u670d\u52a1\u5546\uff0c\u4e13\u6ce8\u4e8e\u4e3a\u56ed\u533a\u4f01\u4e1a\u63d0\u4f9b\u4ece\u521d\u521b\u5b75\u5316\u3001\u6210\u957f\u652f\u6301\u5230\u6210\u719f\u8fd0\u8425\u7684\u5168\u751f\u547d\u5468\u671f\u89e3\u51b3\u65b9\u6848\u3002"}
          </p>
          <div style={{ display: "flex", gap: "var(--space-1)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-on-inverse" href="/coming-soon">
              {"\u4e86\u89e3\u66f4\u591a"}
            </Link>
            <Link className="btn btn-secondary-on-inverse" href="/contact">
              {"\u8054\u7cfb\u6211\u4eec"}
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="about-hero-images" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-1)" }}>
            {heroImages.map((image) => (
              <div key={image.src} style={{ width: image.width, borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <div style={{ position: "relative", width: "100%", paddingTop: image.ratio }}>
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container about-intro-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-3)", alignItems: "center", marginBottom: "var(--space-5)" }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-05)" }}>
              {"\u516c\u53f8\u7b80\u4ecb"}
            </div>
            <h2 style={{ marginBottom: "var(--space-1)" }}>{"\u8d4b\u80fd\u56ed\u533a\u9ad8\u8d28\u91cf\u53d1\u5c55"}</h2>
            <p className="paragraph-large" style={{ marginBottom: "var(--space-2)" }}>
              {"\u6211\u4eec\u4e13\u6ce8\u4e8e\u4e3a\u4ea7\u4e1a\u56ed\u533a\u63d0\u4f9b\u5b9a\u5236\u5316\u62db\u5546\u4e0e\u8fd0\u8425\u7ba1\u7406\u670d\u52a1\uff0c\u63a8\u52a8\u8d44\u6e90\u6574\u5408\u4e0e\u521b\u65b0\u53d1\u5c55\uff0c\u4ee5\u4e13\u4e1a\u670d\u52a1\u63a8\u52a8\u4ea7\u4e1a\u96c6\u805a\uff0c\u52a9\u529b\u4f01\u4e1a\u6210\u957f\u3002"}
            </p>
            <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
              <Link className="btn" href="/about">
                {"\u4e86\u89e3\u6211\u4eec"}
              </Link>
              <Link className="btn btn-secondary" href="/contact">
                {"\u8054\u7cfb\u6211\u4eec"}
              </Link>
            </div>
          </div>
          <Image src="/assets/about-hero-cycling.webp" alt="\u6237\u5916\u62d3\u5c55" width={310} height={200} style={{ borderRadius: "var(--radius-card)", width: "100%", maxWidth: 310, height: "auto", objectFit: "cover" }} />
        </div>

        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {cards.map((card) => (
            <article key={card.title} className="about-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", padding: "var(--space-2)", borderRadius: "var(--radius-card)", background: card.bg, color: "#fff", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "2rem", marginBottom: "var(--space-1)" }}>{card.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "var(--text-lg)", margin: 0 }}>{card.body}</p>
              </div>
              <div className="aspect-square" style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative" }}>
                <Image src={card.src} alt={card.title} fill sizes="(max-width: 768px) 100vw, 480px" style={{ objectFit: "cover" }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about-contact-form" className="section">
        <div className="container contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", alignItems: "start" }}>
          <div>
            <h2 style={{ marginBottom: "var(--space-2)" }}>{"\u9ad8\u6548\u5bf9\u63a5\uff0c\u5408\u4f5c\u5171\u8d62"}</h2>
            <p className="paragraph-large" style={{ lineHeight: 1.8 }}>
              {"\u6b22\u8fce\u54a8\u8be2\u56ed\u533a\u62db\u5546\u4e0e\u8fd0\u8425\u670d\u52a1\u3002"}
              <br />
              {"\u8bf7\u586b\u5199\u8868\u5355\uff0c\u6211\u4eec\u5c06\u5c3d\u5feb\u4e0e\u60a8\u8054\u7cfb\uff0c\u63d0\u4f9b\u4e13\u4e1a\u5b9a\u5236\u5316\u89e3\u51b3\u65b9\u6848\u3002"}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
