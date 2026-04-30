import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中康国悦",
  description: "专注园区招商与管理，定制高效解决方案，推动资源整合与创新升级。",
  icons: {
    icon: "/assets/logo.jpeg",
    apple: "/assets/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
