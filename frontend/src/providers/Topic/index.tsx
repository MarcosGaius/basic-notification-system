"use client";

import { INotification } from "@/types/notification.types";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import { toast } from "react-hot-toast";
import { ITopic } from "@/types/topic.types";
import { getTopics } from "@/services/topic.service";

interface ITopicContext {
  topics: ITopic[];
  setTopics: React.Dispatch<React.SetStateAction<ITopic[] | []>>;
  fetchTopics: () => Promise<ITopic[]>;
  isLoading: boolean;
}

export const TopicContext = createContext({} as ITopicContext);

export default function TopicProvider({ children }: { children: React.ReactNode }) {
  const { isTokenExpired, logout, user } = useContext(AuthContext);

  const [topics, setTopics] = useState<ITopic[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTopics = async () => {
    try {
      setIsLoading(true);

      const topics = await getTopics();
      if (topics.data && topics.data) {
        setTopics(topics.data);
      }

      return topics.data;
    } catch (error) {
      toast.error("Houve um erro ao buscar as notificações");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!topics || !topics.length) {
      if (user && !isTokenExpired(user.access_token)) {
        fetchTopics();
      } else if (user) {
        logout("Sessão expirada");
      }
    }
    setIsLoading(false);
  }, [user]);

  return (
    <TopicContext.Provider value={{ topics, isLoading, setTopics, fetchTopics }}>
      {children}
    </TopicContext.Provider>
  );
}
