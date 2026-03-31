import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { EmptyState } from "@/features/dashboard/empty-state";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatDate } from "@/lib/utils/format";

export default async function DashboardApiPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const apiKeys = await prisma.apiKey.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell title="APIキー管理" description="API利用のためのキー一覧や発行管理を行う領域です。">
      <DashboardNav />
      {apiKeys.length === 0 ? (
        <EmptyState title="APIキーはまだありません" body="次フェーズでAPIキーの発行UIを追加します。" />
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            {apiKeys.map((key) => (
              <div key={key.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontWeight: 700 }}>{key.name}</div>
                <div style={{ color: "#8ea0bf", fontSize: 13 }}>
                  発行日: {formatDate(key.createdAt)} / 最終利用: {key.lastUsedAt ? formatDate(key.lastUsedAt) : "未使用"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
