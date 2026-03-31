import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/token";
import { loginSchema } from "@/features/auth/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "入力内容を確認してください。";
    return NextResponse.json({ message }, { status: 400 });
  }

  const normalizedEmail = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user || !user.passwordHash) {
    return NextResponse.json({ message: "メールアドレスまたはパスワードが違います。" }, { status: 401 });
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ message: "メールアドレスまたはパスワードが違います。" }, { status: 401 });
  }

  if (user.isSuspended) {
    return NextResponse.json({ message: "このアカウントは停止されています。" }, { status: 403 });
  }

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role:
      user.role === "ADMIN"
        ? "admin"
        : user.role === "SUPPORT"
          ? "support"
          : user.role === "SUPER_ADMIN"
            ? "super_admin"
            : "customer",
  });

  const response = NextResponse.json({ ok: true, redirectTo: "/dashboard" });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
