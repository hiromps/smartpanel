import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardNav } from "@/features/dashboard/dashboard-nav";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { formatJPY } from "@/lib/utils/format";

export default async function DashboardOrderNewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const services = await prisma.service.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
    take: 20,
  });

  return (
    <DashboardShell title="新しい注文" description="利用可能なサービスから注文候補を選べる画面です。注文送信の本実装は次フェーズでつなぎます。">
      <DashboardNav />
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>サービス選択</h2>
        {services.length === 0 ? (
          <p style={{ color: "#abc0df" }}>
            まだ公開中のサービスがありません。管理画面でサービス追加後にここへ表示されます。
          </p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {services.map((service) => (
              <div key={service.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontWeight: 700 }}>{service.name}</div>
                <div style={{ color: "#abc0df", fontSize: 14 }}>
                  カテゴリ: {service.category.name} / 料金: {formatJPY(service.price)} / 数量: {service.minQuantity}〜{service.maxQuantity}
                </div>
                {service.description ? (
                  <div style={{ color: "#8ea0bf", fontSize: 13, marginTop: 6 }}>{service.description}</div>
                ) : null}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <Link href="/services" className="button-secondary">公開サービス一覧を見る</Link>
        </div>
      </div>
    </DashboardShell>
  );
}
