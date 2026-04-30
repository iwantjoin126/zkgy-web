import type { Metadata } from "next";
import { PageShell } from "../components";

export const metadata: Metadata = {
  title: "常见问题 - 中康国悦",
  description: "了解我们的园区运营与服务",
};

const questions = [
  ["中康国悦是什么样的企业？", "中康国悦是专注于轻资产园区运营的专业平台公司，致力于通过品牌输出、管理赋能和资源整合，为产业园区提供全生命周期运营解决方案，助力企业成长与区域产业升级。"],
  ["什么是轻资产园区运营模式？", "轻资产园区运营模式是指我们不直接投资建设园区物理空间，而是通过输出品牌、管理体系、招商资源和服务标准，为园区业主提供专业化运营服务。"],
  ["中康国悦与传统的园区开发商有什么区别？", "传统开发商以物业开发销售为主要业务，而我们专注于园区后期运营服务，通过持续的服务赋能提升园区价值。"],
  ["中康国悦提供哪些核心服务？", "我们的服务包括：产业定位规划、精准招商服务、企业服务体系搭建、智慧园区建设、政策咨询申报、金融服务对接、产业链资源整合等全方位运营服务。"],
  ["你们如何帮助企业解决发展中的问题？", "我们通过构建产业生态圈，为企业提供从初创孵化、成长加速到成熟扩张的全周期服务。"],
  ["如何申请定制化运营方案？", "您可通过官网或客服提交需求，我们将安排专人与您沟通，制定专属运营管理方案。"],
  ["企业如何入驻中康国悦运营的园区？", "企业可以通过官网入驻申请通道、服务热线或直接联系我们的招商团队。"],
  ["入驻园区后有哪些支持？", "入驻企业可享受政策咨询、资源对接、日常管理等全方位服务，助力企业发展。"],
];

export default function FAQ() {
  return (
    <PageShell>
      <main>
        <section style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
          <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>常见问题解答</h1>
            <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)", margin: 0 }}>了解我们的园区运营与服务</p>
          </div>
        </section>
        <section style={{ paddingBottom: "6rem" }}>
          <div className="container" style={{ maxWidth: "48rem" }}>
            {questions.map(([q, a]) => (
              <details key={q} style={{ borderBottom: "1px solid var(--color-border-primary)", padding: "1.25rem 0" }}>
                <summary style={{ cursor: "pointer", fontSize: "1.125rem", fontWeight: 650 }}>{q}</summary>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, margin: "1rem 0 0 1.5rem" }}>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
