type DashboardShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DashboardShell({ title, description, children }: DashboardShellProps) {
  return (
    <div className="container" style={{ padding: "32px 0 64px" }}>
      <div style={{ marginBottom: 24 }}>
        <div className="badge">顧客ダッシュボード</div>
        <h1 style={{ fontSize: 32, margin: "16px 0 8px" }}>{title}</h1>
        <p style={{ color: "#a8bbda", margin: 0 }}>{description}</p>
      </div>
      {children}
    </div>
  );
}
