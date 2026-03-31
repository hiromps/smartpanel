export default function LoginPage() {
  return (
    <main className="container" style={{ padding: "64px 0 80px" }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 28 }}>
        <div className="badge">ログイン</div>
        <h1 style={{ margin: "16px 0 12px" }}>アカウントにログイン</h1>
        <p style={{ color: "#abc0df", lineHeight: 1.7 }}>
          認証基盤は今後 Better Auth 系で接続予定です。現時点ではUI雛形を用意しています。
        </p>
      </div>
    </main>
  );
}
