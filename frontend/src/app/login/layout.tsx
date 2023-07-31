import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Login - Notify",
  description: "Sistema básico para notificação de usuários",
};

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
