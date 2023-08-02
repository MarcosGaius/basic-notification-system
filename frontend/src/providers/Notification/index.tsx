"use client";

import { INotification } from "@/types/notification.types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import { getUserNotifications } from "@/services/user.service";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface INotificationContext {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[] | []>>;
  fetchNotifications: (userId: string) => Promise<INotification[]>;
  subscribeToSocket: () => void;
  isLoading: boolean;
}

export const NotificationContext = createContext({} as INotificationContext);

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { isTokenExpired, logout, user, isLoading: isLoadingAuth } = useContext(AuthContext);

  const [notifications, setNotifications] = useState<INotification[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>();

  const fetchNotifications = async (userId: string) => {
    try {
      setIsLoading(true);

      const notifications = await getUserNotifications(userId);
      if (notifications.data && notifications.data.length) {
        setNotifications(
          notifications.data
            .map((topic: any) => topic.messages)
            .flat()
            .reverse()
        );
      }

      return notifications.data;
    } catch (error) {
      toast.error("Houve um erro ao buscar as notificações");
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToSocket = useCallback(() => {
    try {
      if (!user) return;

      if (socket) {
        socket.emit("subscribe", { userId: user?.user._id });
      } else {
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL || "", {
          extraHeaders: {
            authorization: user?.access_token || "",
          },
        });
        setSocket(newSocket);
      }
    } catch (error) {
      toast.error("Houve um problema ao conectar ao servidor de notificações");
    }
  }, [socket, user, isLoadingAuth]);

  useEffect(() => {
    if (!user) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
      extraHeaders: {
        authorization: user?.access_token || "",
      },
    });

    setSocket(socket);

    socket.on("newNotification", (notification) => {
      notification = JSON.parse(notification);

      toast(`Nova notificação! \n ${notification.content} - ${notification.sender.name}`, {
        icon: "🔔",
      });
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [user]);

  useEffect(() => {
    if (!notifications || !notifications.length) {
      if (user && !isTokenExpired(user.access_token)) {
        fetchNotifications(user.user._id);
      } else if (user) {
        logout("Sessão expirada");
      }
    }
    setIsLoading(false);
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, fetchNotifications, subscribeToSocket, isLoading }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
