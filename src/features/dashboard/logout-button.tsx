"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="button-secondary"
      style={{ border: 0, cursor: "pointer" }}
      onClick={() => {
        startTransition(async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          router.push("/login");
          router.refresh();
        });
      }}
    >
      {pending ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}
