import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartPanel | SNS運用・再販管理プラットフォーム",
  description: "日本向けに設計されたSNS運用・再販管理プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
