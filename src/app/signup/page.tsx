export default function SignupPage() {
  return (
    <main className="container" style={{ padding: "64px 0 80px" }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 28 }}>
        <div className="badge">新規登録</div>
        <h1 style={{ margin: "16px 0 12px" }}>日本向けパネルを始める</h1>
        <p style={{ color: "#abc0df", lineHeight: 1.7 }}>
          MVPではメール認証とロール管理を含む認証基盤を後続で接続します。
          ここでは導線と画面構成を先に整えています。
        </p>
      </div>
    </main>
  );
}
