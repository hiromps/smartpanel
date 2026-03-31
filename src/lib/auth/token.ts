import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "replace-me");
const SESSION_COOKIE = "smartpanel_session";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: "customer" | "support" | "admin" | "super_admin";
};

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload as unknown as SessionPayload;
}

export { SESSION_COOKIE };
