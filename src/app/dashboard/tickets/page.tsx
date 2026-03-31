import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { EmptyState } from "@/features/dashboard/empty-state";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatDate } from "@/lib/utils/format";

export default async function DashboardTicketsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tickets = await prisma.ticket.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <DashboardShell title="サポート" description="問い合わせ履歴と対応状況を確認できます。">
      <DashboardNav />
      {tickets.length === 0 ? (
        <EmptyState title="サポート履歴はまだありません" body="問い合わせを作成すると、ここからやり取りを追えます。" />
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontWeight: 700 }}>{ticket.subject}</div>
                <div style={{ color: "#8ea0bf", fontSize: 13 }}>
                  状態: {ticket.status} / 更新日: {formatDate(ticket.updatedAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
