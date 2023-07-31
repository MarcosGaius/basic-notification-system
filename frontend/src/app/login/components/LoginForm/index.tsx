"use client";

import { ReactNode } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

interface ILoginFormProps {
  children?: ReactNode;
}

export default function LoginForm({ children }: ILoginFormProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <form className="space-y-4 md:space-y-6" action="#">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="nome@email.com"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <Button type="button" onClick={handleLogin}>
        Entrar
      </Button>
    </form>
  );
}
