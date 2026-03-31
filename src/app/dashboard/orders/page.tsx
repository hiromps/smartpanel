import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { EmptyState } from "@/features/dashboard/empty-state";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatDate, formatJPY } from "@/lib/utils/format";

export default async function DashboardOrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { service: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell title="注文履歴" description="過去の注文一覧と進行状況を確認できます。">
      <DashboardNav />
      {orders.length === 0 ? (
        <EmptyState title="注文はまだありません" body="最初の注文を作成すると、ここに履歴が表示されます。" />
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            {orders.map((order) => (
              <div key={order.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontWeight: 700 }}>{order.service.name}</div>
                <div style={{ color: "#abc0df", fontSize: 14 }}>
                  数量: {order.quantity} / 請求額: {formatJPY(order.chargeAmount)}
                </div>
                <div style={{ color: "#abc0df", fontSize: 14 }}>リンク: {order.targetUrl}</div>
                <div style={{ color: "#8ea0bf", fontSize: 13 }}>
                  状態: {order.status} / 作成日: {formatDate(order.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
