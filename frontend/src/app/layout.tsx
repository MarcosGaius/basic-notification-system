import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/providers/Auth";
import { Toaster } from "react-hot-toast";
import NotificationProvider from "@/providers/Notification";
import TopicProvider from "@/providers/Topic";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notify",
  description: "Sistema básico para notificação de usuários",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            <TopicProvider>
              <Toaster position="top-center" />
              {children}
            </TopicProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
