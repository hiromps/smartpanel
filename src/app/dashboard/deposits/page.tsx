import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { EmptyState } from "@/features/dashboard/empty-state";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatDate, formatJPY } from "@/lib/utils/format";

export default async function DashboardDepositsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const deposits = await prisma.depositRequest.findMany({
    where: { userId: user.id },
    include: { paymentMethod: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell title="入金履歴" description="ウォレットへの入金申請と進行状況を確認できます。">
      <DashboardNav />
      {deposits.length === 0 ? (
        <EmptyState title="入金履歴はまだありません" body="銀行振込や決済導線を追加すると、ここに履歴が出ます。" />
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            {deposits.map((deposit) => (
              <div key={deposit.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontWeight: 700 }}>{deposit.paymentMethod.name}</div>
                <div style={{ color: "#abc0df", fontSize: 14 }}>金額: {formatJPY(deposit.amount)}</div>
                <div style={{ color: "#8ea0bf", fontSize: 13 }}>
                  状態: {deposit.status} / 申請日: {formatDate(deposit.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
