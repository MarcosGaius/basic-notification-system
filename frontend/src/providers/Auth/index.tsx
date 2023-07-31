"use client";

import { IUserData } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  setUser: React.Dispatch<React.SetStateAction<IUserData | null>>;
  user: IUserData | null;
  logout: (message?: string) => void;
  login: (data: { email: string; pwd: string }) => Promise<unknown>;
}

export const AuthContext = createContext({} as IAuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const login = (data: { email: string; pwd: string }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { id: 1, name: "John Doe" };
        // setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  };

  const logout = (message?: string) => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
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
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser && storedUser.token) {
      if (!isTokenExpired(storedUser.token)) {
        setUser(storedUser);
      } else {
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  return <AuthContext.Provider value={{ setUser, user, logout, login }}>{children}</AuthContext.Provider>;
}
