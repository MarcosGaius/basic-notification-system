"use client";

import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import { createTopic } from "@/services/topic.service";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { TopicContext } from "@/providers/Topic";
import { NotificationContext } from "@/providers/Notification";

interface ITopicDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicDialog = ({ open, setOpen }: ITopicDialogProps) => {
  const { setTopics } = useContext(TopicContext);
  const { subscribeToSocket } = useContext(NotificationContext);
  const [topicName, setTopicName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);

      const newTopic = await createTopic({ name: topicName });

      if (newTopic.data) {
        setTopics((prevTopics) => [newTopic.data, ...prevTopics]);
        subscribeToSocket();

        onClose();
        toast.success("Sucesso: tópico criado!");
      }
    } catch (error) {
      let message = "Erro: Houve um erro ao criar o tópico. Tente novamente.";

      if (error instanceof AxiosError) {
        error?.response?.data.message
          ? (message = `Erro: ${error?.response?.data.message}`)
          : message;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    setTopicName("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Criar tópico</DialogTitle>
      <DialogContent>
        <DialogContentText>Digite abaixo um nome único para o tópico</DialogContentText>
        <Grid container spacing={1} className="mt-1">
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome do tópico"
              fullWidth
              size="small"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSend} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress color="primary" size={12} /> : "Criar tópico"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TopicDialog;
