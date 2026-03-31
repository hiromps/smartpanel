import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

export type AppRole = "customer" | "support" | "admin" | "super_admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

function mapRole(role: string): AppRole {
  switch (role) {
    case "SUPPORT":
      return "support";
    case "ADMIN":
      return "admin";
    case "SUPER_ADMIN":
      return "super_admin";
    default:
      return "customer";
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const payload = await verifySessionToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true, isSuspended: true },
    });

    if (!user || user.isSuspended) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: mapRole(user.role),
    };
  } catch {
    return null;
  }
}
