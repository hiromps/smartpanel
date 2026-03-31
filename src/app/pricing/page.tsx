const plans = [
  {
    name: "Starter",
    price: "¥0",
    body: "検証用の初期プラン。基本画面の導線確認向け。",
  },
  {
    name: "Business",
    price: "要見積もり",
    body: "本格運用向け。決済、プロバイダ、レポートを拡張。",
  },
];

export default function PricingPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div className="badge">料金</div>
      <h1 style={{ fontSize: 42, margin: "18px 0 12px" }}>料金ページの初期雛形</h1>
      <div className="grid-cards cols-2" style={{ marginTop: 24 }}>
        {plans.map((plan) => (
          <div key={plan.name} className="card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>{plan.name}</h2>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{plan.price}</div>
            <p style={{ color: "#abc0df", lineHeight: 1.7, marginBottom: 0 }}>{plan.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
