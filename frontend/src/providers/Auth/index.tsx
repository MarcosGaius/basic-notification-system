"use client";

import { IUserData } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NotificationContext } from "../Notification";

interface IAuthContext {
  setUser: React.Dispatch<React.SetStateAction<{ user: IUserData; access_token: string } | null>>;
  user: { user: IUserData; access_token: string } | null;
  logout: (message?: string) => void;
  login: (data: { user: IUserData; access_token: string }) => void;
  isTokenExpired: (token: string) => boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as IAuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ user: IUserData; access_token: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const login = (data: { user: IUserData; access_token: string }) => {
    setUser(data);
    localStorage.setItem("notify@user", JSON.stringify(data));
    router.push("/");
    toast.success("Login bem-sucedido. Bem-vindo!");
  };

  const logout = (message?: string) => {
    setUser(null);
    localStorage.removeItem("notify@user");
    router.push("/login");
    if (message) toast(message, { icon: "❗" });
  };

  const isTokenExpired = (token: string) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("notify@user") || "{}");

    if (storedUser && storedUser.access_token) {
      if (!isTokenExpired(storedUser.access_token)) {
        setUser(storedUser);
      } else if (storedUser) {
        logout("Sessão expirada. Logue novamente");
      }
    }
    setIsLoading(false);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ setUser, user, logout, login, isTokenExpired, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
