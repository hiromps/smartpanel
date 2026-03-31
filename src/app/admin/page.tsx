import { AdminShell } from "@/components/admin/admin-shell";

const adminMetrics = [
  { label: "本日の売上", value: "¥128,000" },
  { label: "保留中の入金", value: "6件" },
  { label: "稼働中サービス", value: "142" },
  { label: "接続プロバイダ", value: "3" },
];

export default function AdminPage() {
  return (
    <AdminShell
      title="管理ダッシュボード"
      description="売上、注文、入金、プロバイダの状態を俯瞰する管理画面の雛形です。"
    >
      <div className="grid-cards cols-4" style={{ marginBottom: 20 }}>
        {adminMetrics.map((metric) => (
          <div key={metric.label} className="card" style={{ padding: 20 }}>
            <div style={{ color: "#8ea0bf", fontSize: 13 }}>{metric.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-cards cols-2">
        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>優先対応</h2>
          <ul style={{ color: "#b8c8e4", lineHeight: 1.9, paddingLeft: 20 }}>
            <li>保留中の銀行振込を確認</li>
            <li>失敗注文を再送または返金</li>
            <li>サービス単価の見直し</li>
            <li>未返信チケットの整理</li>
          </ul>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>システム状況</h2>
          <ul style={{ color: "#b8c8e4", lineHeight: 1.9, paddingLeft: 20 }}>
            <li>注文同期ジョブ: 正常</li>
            <li>入金承認フロー: 手動運用</li>
            <li>監査ログ: 記録有効</li>
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
