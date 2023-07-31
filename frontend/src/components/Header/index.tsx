"use client";

import { AuthContext } from "@/providers/Auth";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function Header() {
  const { logout } = useContext(AuthContext);

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (route: string) => {
    return pathname === route ? "text-primary-500 hover:text-slate-900" : "text-slate-900 hover:text-primary-500";
  };

  return (
    <header className="bg-gray-100">
      <div className="max-w-[1300px] w-full mx-auto flex justify-between items-center p-4">
        <h2 className="font-black text-gray-100 text-lg bg-primary-500 px-2 py-2">NOTIFY</h2>
        <div className="flex gap-4">
          <button className={`px-4 py-2 font-normal transition-colors ${isActive("/")}`} onClick={() => router.push("/")}>
            Notificações
          </button>
          <button className={`px-4 py-2 font-normal transition-colors ${isActive("/topic")}`} onClick={() => router.push("/topic")}>
            Tópicos
          </button>
          <button className="px-4 py-2 font-normal transition-colors hover:text-primary-500" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
