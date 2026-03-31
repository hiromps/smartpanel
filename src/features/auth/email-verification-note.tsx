export function EmailVerificationNote() {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 16,
        color: "#abc0df",
        background: "rgba(255,255,255,0.03)",
        lineHeight: 1.7,
        fontSize: 14,
      }}
    >
      メール登録は有効です。現在は登録後にそのままログインできます。
      次フェーズで認証メール送信とメール確認フローを追加します。
    </div>
  );
}
