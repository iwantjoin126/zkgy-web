import Image from "next/image";
import Link from "next/link";
import { PageShell } from "../components";

export default function ComingSoon() {
  return (
    <PageShell inverseHeader>
      <main className="section-inverse" style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "var(--space-5) 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(250,250,250,0.55)", marginBottom: "var(--space-1)" }}>Coming Soon</div>
            <h1 className="heading-h1" style={{ color: "var(--color-text-inverse)", marginBottom: "var(--space-2)" }}>服务内容正在完善</h1>
            <p className="subheading" style={{ color: "rgba(250,250,250,0.7)", lineHeight: 1.7, marginBottom: "var(--space-2)" }}>
              我们正在整理更多园区招商、运营、产业服务与区域项目内容。您可以先联系我们获取定制化解决方案。
            </p>
            <Link className="btn btn-on-inverse" href="/contact">立即咨询</Link>
          </div>
          <div className="aspect-square" style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <Image src="/assets/coming-soon-hero.avif" alt="服务预告" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
