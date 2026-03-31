import Link from "next/link";

const links = [
  { href: "/services", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/faq", label: "FAQ" },
  { href: "/login", label: "ログイン" },
];

export function SiteHeader() {
  return (
    <header style={{ padding: "20px 0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: 20 }}>
          SmartPanel
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={{ color: "#c3d3ef" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/signup" className="button-primary">
            無料ではじめる
          </Link>
        </nav>
      </div>
    </header>
  );
}
