type AdminShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <div className="container" style={{ padding: "32px 0 64px" }}>
      <div style={{ marginBottom: 24 }}>
        <div className="badge">管理画面</div>
        <h1 style={{ fontSize: 32, margin: "16px 0 8px" }}>{title}</h1>
        <p style={{ color: "#a8bbda", margin: 0 }}>{description}</p>
      </div>
      {children}
    </div>
  );
}
