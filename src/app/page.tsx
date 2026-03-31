import Link from "next/link";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const highlights = [
  {
    title: "注文運用を一本化",
    body: "サービス管理、注文受付、進行確認、サポート対応をひとつの管理画面に集約。",
  },
  {
    title: "日本向けUI",
    body: "日本語を標準にした顧客体験。残高、入金、注文の導線をわかりやすく設計。",
  },
  {
    title: "拡張しやすい基盤",
    body: "決済、プロバイダ、通知、レポートを後から増やしやすい構成でスタート。",
  },
];

const stats = [
  { label: "想定ロール", value: "5" },
  { label: "MVP主要領域", value: "8" },
  { label: "優先通貨", value: "JPY" },
  { label: "初期言語", value: "日本語" },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container" style={{ padding: "40px 0 32px" }}>
          <div className="badge">SmartPanel</div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.05, margin: "18px 0 18px" }}>
            SNS運用も再販管理も、
            <br />
            ひとつの基盤で回す。
          </h1>
          <p style={{ maxWidth: 760, color: "#acc1e3", fontSize: 18, lineHeight: 1.7 }}>
            SmartPanel は、日本市場向けに設計された SNS運用・再販管理プラットフォームです。
            顧客画面、管理画面、注文処理、入金導線、プロバイダ連携の土台をまとめて整えます。
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/signup" className="button-primary">
              無料ではじめる
            </Link>
            <Link href="/dashboard" className="button-secondary">
              ダッシュボードを見る
            </Link>
          </div>
        </section>

        <section className="container" style={{ padding: "24px 0 12px" }}>
          <div className="grid-cards cols-4">
            {stats.map((item) => (
              <div key={item.label} className="card" style={{ padding: 20 }}>
                <div style={{ color: "#8ea0bf", fontSize: 13 }}>{item.label}</div>
                <div style={{ fontSize: 32, fontWeight: 800, marginTop: 10 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="container" style={{ padding: "28px 0 18px" }}>
          <div className="grid-cards cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="card" style={{ padding: 24 }}>
                <h2 style={{ marginTop: 0 }}>{item.title}</h2>
                <p style={{ color: "#abc0df", lineHeight: 1.7, marginBottom: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
