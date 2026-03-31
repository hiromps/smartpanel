"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

type GoogleAuthButtonProps = {
  text?: string;
};

export function GoogleAuthButton({ text = "Googleで続行" }: GoogleAuthButtonProps) {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential?: string }) => {
        setError(null);
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = (await res.json()) as { message?: string; redirectTo?: string };
        if (!res.ok) {
          setError(data.message ?? "Google認証に失敗しました。");
          return;
        }

        router.push(data.redirectTo ?? "/dashboard");
        router.refresh();
      },
    });

    buttonRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "pill",
      width: 320,
      locale: "ja",
    });
  }, [clientId, router]);

  if (!clientId) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <div style={{ color: "#abc0df", fontSize: 14 }}>{text}</div>
      <div ref={buttonRef} />
      {error ? <div style={{ color: "#ff8e8e", fontSize: 14 }}>{error}</div> : null}
    </div>
  );
}
