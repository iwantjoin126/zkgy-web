import Link from "next/link";
import { PageShell } from "../components";

export default function Admin() {
  return (
    <PageShell>
      <main className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="eyebrow" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>Admin</div>
          <h1 className="heading-h1" style={{ marginBottom: "var(--space-2)" }}>内容管理入口</h1>
          <p className="paragraph-large" style={{ lineHeight: 1.8, marginBottom: "var(--space-2)" }}>
            原部署包含 `/admin` 路由。这里先保留后台入口占位，后续可以接入登录、内容管理、咨询表单查看等功能。
          </p>
          <Link className="btn btn-primary" href="/">返回首页</Link>
        </div>
      </main>
    </PageShell>
  );
}
