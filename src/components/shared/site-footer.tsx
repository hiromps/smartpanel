export function SiteFooter() {
  return (
    <footer style={{ padding: "32px 0 48px", color: "#97aacb" }}>
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>SmartPanel</div>
        <div>SNS運用・再販管理プラットフォーム。初期MVPのUI雛形です。</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/legal">特定商取引法に基づく表記</a>
        </div>
      </div>
    </footer>
  );
}
