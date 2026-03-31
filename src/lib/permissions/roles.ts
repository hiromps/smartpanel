import type { AppRole } from "@/lib/auth/session";

export const roleHierarchy: Record<AppRole, number> = {
  customer: 1,
  support: 2,
  admin: 3,
  super_admin: 4,
};

export function hasRequiredRole(current: AppRole, minimum: AppRole) {
  return roleHierarchy[current] >= roleHierarchy[minimum];
}
