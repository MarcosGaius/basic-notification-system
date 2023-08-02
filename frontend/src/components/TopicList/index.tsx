"use client";

import { AuthContext } from "@/providers/Auth";
import { TopicContext } from "@/providers/Topic";
import { NotificationContext } from "@/providers/Notification";
import { subscribeToTopic } from "@/services/topic.service";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const tableStyles = "min-w-full max-h-screen overflow-auto divide-y divide-gray-200";
const rowStyles = "bg-white divide-y divide-gray-200";
const cellStyles = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

export default function TopicList() {
  const { topics, isLoading } = useContext(TopicContext);
  const { user } = useContext(AuthContext);
  const { subscribeToSocket } = useContext(NotificationContext);

  const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);

  const handleSubscribe = async (topicId: string) => {
    try {
      setIsLoadingSubscribe(true);
      if (!user) return;
      const response = await subscribeToTopic(user.user._id, topicId);

      if (response.status === 200) {
        toast.success("Sucesso: Inscrito no tópico!");
        subscribeToSocket();
      }
    } catch (error) {
      let message = "Erro: Houve um erro ao inscrever-se. Tente novamente.";

      if (error instanceof AxiosError) {
        error?.response?.data.message
          ? (message = `Erro: ${error?.response?.data.message}`)
          : message;
      }

      toast.error(message);
    } finally {
      setIsLoadingSubscribe(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 mx-auto mt-10">
        <CircularProgress size={16} />
        <small>Carregando...</small>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={tableStyles}>
        <TableHead>
          <TableRow>
            <TableCell className={cellStyles + " font-bold"}>Nome</TableCell>
            <TableCell className={cellStyles}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            topics.length > 0 &&
            topics.map((item) => (
              <TableRow key={item._id} className={rowStyles}>
                <TableCell className={cellStyles}>{item.name}</TableCell>
                <TableCell className={cellStyles}>
                  <Button
                    variant="contained"
                    color="info"
                    className="bg-blue-500"
                    onClick={() => handleSubscribe(item._id)}
                    disabled={isLoadingSubscribe}
                  >
                    {isLoadingSubscribe ? (
                      <CircularProgress color="primary" size={12} />
                    ) : (
                      "Inscrever-se"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
