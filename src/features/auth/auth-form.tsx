"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup";

type AuthFormProps = {
  mode: Mode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function onSubmit(formData: FormData) {
    setError(null);

    const payload = Object.fromEntries(formData.entries());

    startTransition(async () => {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string; redirectTo?: string };
      if (!response.ok) {
        setError(data.message ?? "エラーが発生しました。時間をおいて再度お試しください。");
        return;
      }

      router.push(data.redirectTo ?? "/dashboard");
      router.refresh();
    });
  }

  return (
    <form
      action={onSubmit}
      style={{ display: "grid", gap: 16, marginTop: 20 }}
    >
      {isSignup ? (
        <label style={{ display: "grid", gap: 8 }}>
          <span>表示名</span>
          <input name="name" required style={inputStyle} placeholder="山田 太郎" />
        </label>
      ) : null}

      <label style={{ display: "grid", gap: 8 }}>
        <span>メールアドレス</span>
        <input name="email" type="email" required style={inputStyle} placeholder="you@example.com" />
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        <span>パスワード</span>
        <input name="password" type="password" required style={inputStyle} placeholder="8文字以上" />
      </label>

      {isSignup ? (
        <label style={{ display: "grid", gap: 8 }}>
          <span>確認用パスワード</span>
          <input name="confirmPassword" type="password" required style={inputStyle} placeholder="もう一度入力" />
        </label>
      ) : null}

      {error ? (
        <div style={{ color: "#ff8e8e", fontSize: 14 }}>{error}</div>
      ) : null}

      <button type="submit" className="button-primary" disabled={isPending} style={{ border: 0, cursor: "pointer" }}>
        {isPending ? "送信中..." : isSignup ? "会員登録する" : "ログインする"}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  padding: "12px 14px",
};
