const categories = [
  "Instagram エンゲージメント",
  "YouTube プロモーション",
  "TikTok ブースト",
  "X / Threads 施策",
];

export default function ServicesPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div className="badge">サービス一覧</div>
      <h1 style={{ fontSize: 42, margin: "18px 0 12px" }}>販売カテゴリの雛形</h1>
      <p style={{ color: "#abc0df", maxWidth: 760, lineHeight: 1.8 }}>
        ここではカテゴリ、提供条件、最小数量、所要時間目安などを表示します。
        本番ではサービス定義とプロバイダマッピングに連動します。
      </p>
      <div className="grid-cards cols-2" style={{ marginTop: 24 }}>
        {categories.map((category) => (
          <div key={category} className="card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>{category}</h2>
            <p style={{ color: "#abc0df", lineHeight: 1.7, marginBottom: 0 }}>
              カテゴリ説明、注文時の注意点、反映目安をここに表示します。
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
