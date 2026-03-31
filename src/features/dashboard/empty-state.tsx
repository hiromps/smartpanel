type EmptyStateProps = {
  title: string;
  body: string;
};

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="card" style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ color: "#abc0df", lineHeight: 1.7, marginBottom: 0 }}>{body}</p>
    </div>
  );
}
