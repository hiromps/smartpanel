import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatDate, formatJPY } from "@/lib/utils/format";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { LogoutButton } from "@/features/dashboard/logout-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      wallet: true,
      orders: {
        include: { service: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      depositRequests: {
        include: { paymentMethod: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      tickets: {
        orderBy: { updatedAt: "desc" },
        take: 5,
      },
      apiKeys: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!dbUser) {
    redirect("/login");
  }

  const activeOrders = dbUser.orders.filter((order) =>
    ["PENDING", "QUEUED", "PROCESSING", "PARTIALLY_COMPLETED"].includes(order.status),
  ).length;

  const totalSpent = dbUser.orders.reduce((sum, order) => sum + order.chargeAmount, 0);
  const openTickets = dbUser.tickets.filter((ticket) => ticket.status !== "CLOSED").length;

  const metrics = [
    { label: "現在の残高", value: formatJPY(dbUser.wallet?.balance ?? 0) },
    { label: "進行中の注文", value: `${activeOrders}件` },
    { label: "累計利用額", value: formatJPY(totalSpent) },
    { label: "未解決チケット", value: `${openTickets}件` },
  ];

  return (
    <DashboardShell
      title={`ようこそ、${dbUser.name}さん`}
      description="会員マイページとして使えるダッシュボードの初版です。注文、入金、サポート、APIキーをまとめて確認できます。"
    >
      <DashboardNav />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <div className="badge">{dbUser.email}</div>
        <LogoutButton />
      </div>

      <div className="grid-cards cols-4" style={{ marginBottom: 20 }}>
        {metrics.map((metric) => (
          <div key={metric.label} className="card" style={{ padding: 20 }}>
            <div style={{ color: "#8ea0bf", fontSize: 13 }}>{metric.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-cards cols-2" style={{ marginBottom: 20 }}>
        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>クイックアクション</h2>
          <div style={{ display: "grid", gap: 12 }}>
            <Link href="/dashboard/orders/new" className="button-primary">新しい注文を作成</Link>
            <Link href="/dashboard/deposits" className="button-secondary">入金履歴を見る</Link>
            <Link href="/dashboard/tickets" className="button-secondary">サポートを確認</Link>
            <Link href="/dashboard/api" className="button-secondary">APIキー管理へ</Link>
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>アカウント概要</h2>
          <ul style={{ color: "#b8c8e4", lineHeight: 1.9, paddingLeft: 20, marginBottom: 0 }}>
            <li>表示名: {dbUser.name}</li>
            <li>メールアドレス: {dbUser.email}</li>
            <li>権限: {dbUser.role}</li>
            <li>登録日: {formatDate(dbUser.createdAt)}</li>
          </ul>
        </section>
      </div>

      <div className="grid-cards cols-2">
        <section className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <h2 style={{ marginTop: 0, marginBottom: 0 }}>最近の注文</h2>
            <Link href="/dashboard/orders" style={{ color: "#9ebcff" }}>すべて見る</Link>
          </div>
          {dbUser.orders.length === 0 ? (
            <p style={{ color: "#abc0df" }}>まだ注文はありません。</p>
          ) : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {dbUser.orders.map((order) => (
                <div key={order.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12 }}>
                  <div style={{ fontWeight: 700 }}>{order.service.name}</div>
                  <div style={{ color: "#abc0df", fontSize: 14 }}>数量: {order.quantity} / 料金: {formatJPY(order.chargeAmount)}</div>
                  <div style={{ color: "#8ea0bf", fontSize: 13 }}>状態: {order.status} / {formatDate(order.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <h2 style={{ marginTop: 0, marginBottom: 0 }}>最近の入金</h2>
            <Link href="/dashboard/deposits" style={{ color: "#9ebcff" }}>すべて見る</Link>
          </div>
          {dbUser.depositRequests.length === 0 ? (
            <p style={{ color: "#abc0df" }}>まだ入金履歴はありません。</p>
          ) : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {dbUser.depositRequests.map((deposit) => (
                <div key={deposit.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12 }}>
                  <div style={{ fontWeight: 700 }}>{deposit.paymentMethod.name}</div>
                  <div style={{ color: "#abc0df", fontSize: 14 }}>{formatJPY(deposit.amount)}</div>
                  <div style={{ color: "#8ea0bf", fontSize: 13 }}>状態: {deposit.status} / {formatDate(deposit.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
