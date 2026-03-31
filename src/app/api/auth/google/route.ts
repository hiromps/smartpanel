import { NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { prisma } from "@/lib/db/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/token";

const JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export async function POST(request: Request) {
  const body = (await request.json()) as { credential?: string };
  const credential = body.credential;

  if (!credential) {
    return NextResponse.json({ message: "Google認証トークンが見つかりません。" }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ message: "Google認証の設定が未完了です。" }, { status: 500 });
  }

  try {
    const { payload } = await jwtVerify(credential, JWKS, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
      audience: clientId,
    });

    const email = String(payload.email || "").toLowerCase();
    const name = String(payload.name || email.split("@")[0] || "Google User");

    if (!email) {
      return NextResponse.json({ message: "Googleアカウントのメールアドレスを取得できませんでした。" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          wallet: { create: {} },
        },
      });
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
  } catch {
    return NextResponse.json({ message: "Google認証に失敗しました。" }, { status: 401 });
  }
}
