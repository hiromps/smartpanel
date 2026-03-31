import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/features/auth/auth-form";
import { EmailVerificationNote } from "@/features/auth/email-verification-note";
import { GoogleAuthButton } from "@/features/auth/google-auth-button";
import { getCurrentUser } from "@/lib/auth/session";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="container" style={{ padding: "64px 0 80px" }}>
      <div className="card" style={{ maxWidth: 560, margin: "0 auto", padding: 28 }}>
        <div className="badge">ログイン</div>
        <h1 style={{ margin: "16px 0 12px" }}>SmartPanel にログイン</h1>
        <p style={{ color: "#abc0df", lineHeight: 1.7 }}>
          Google登録またはメールアドレス登録の2種類でログインできます。
        </p>
        <GoogleAuthButton text="Googleアカウントでログイン" />
        <div style={{ margin: "18px 0", textAlign: "center", color: "#8ea0bf" }}>または</div>
        <AuthForm mode="login" />
        <div style={{ marginTop: 16 }}>
          <EmailVerificationNote />
        </div>
        <p style={{ marginTop: 16, color: "#abc0df" }}>
          アカウントをお持ちでないですか？ <Link href="/signup">会員登録へ</Link>
        </p>
      </div>
    </main>
  );
}
