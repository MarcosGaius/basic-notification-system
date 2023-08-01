import AuthProvider from "@/providers/Auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Login - Notify",
  description: "Sistema básico para notificação de usuários",
};

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
