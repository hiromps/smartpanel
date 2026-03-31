import Link from "next/link";
import { customerNavigation } from "@/config/navigation";

export function DashboardNav() {
  return (
    <div className="card" style={{ padding: 16, marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {customerNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#c8d6ee",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
