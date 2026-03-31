export type AppRole = "customer" | "support" | "admin" | "super_admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  return null;
}
