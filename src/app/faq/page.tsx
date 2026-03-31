const faqs = [
  {
    q: "このプロジェクトは何ですか？",
    a: "日本向けに設計したSMM運営・再販パネルのMVP雛形です。",
  },
  {
    q: "どこまで実装済みですか？",
    a: "現在は顧客画面、管理画面、Prisma基盤、要件ドキュメントの初期構築フェーズです。",
  },
  {
    q: "決済は入っていますか？",
    a: "MVPでは手動入金を優先し、Stripe / PayPal は拡張前提の設計にしています。",
  },
];

export default function FaqPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div className="badge">FAQ</div>
      <h1 style={{ fontSize: 42, margin: "18px 0 12px" }}>よくある質問</h1>
      <div className="grid-cards" style={{ marginTop: 24 }}>
        {faqs.map((item) => (
          <div key={item.q} className="card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 22 }}>{item.q}</h2>
            <p style={{ color: "#abc0df", lineHeight: 1.7, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
