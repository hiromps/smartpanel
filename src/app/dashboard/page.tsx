import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const metrics = [
  { label: "現在の残高", value: "¥12,800" },
  { label: "進行中の注文", value: "14件" },
  { label: "今月の利用額", value: "¥48,300" },
  { label: "未対応チケット", value: "2件" },
];

export default function DashboardPage() {
  return (
    <DashboardShell
      title="顧客ダッシュボード"
      description="残高、注文、サポートの状況をまとめて確認できる土台ページです。"
    >
      <div className="grid-cards cols-4" style={{ marginBottom: 20 }}>
        {metrics.map((metric) => (
          <div key={metric.label} className="card" style={{ padding: 20 }}>
            <div style={{ color: "#8ea0bf", fontSize: 13 }}>{metric.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-cards cols-2">
        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>クイックアクション</h2>
          <ul style={{ color: "#b8c8e4", lineHeight: 1.9, paddingLeft: 20 }}>
            <li>新しい注文を作成する</li>
            <li>銀行振込の入金申請を送る</li>
            <li>APIキーを発行する</li>
            <li>サポートへ問い合わせる</li>
          </ul>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>最近の動き</h2>
          <ul style={{ color: "#b8c8e4", lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Instagram いいね注文 #1024 が進行中</li>
            <li>ウォレット残高に ¥5,000 を反映待ち</li>
            <li>サポートチケット #88 に返信あり</li>
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
