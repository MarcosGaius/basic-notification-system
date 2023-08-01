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
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Select,
  Autocomplete,
  Grid,
  CircularProgress,
} from "@mui/material";
import { TopicContext } from "@/providers/Topic";
import { ITopic } from "@/types/topic.types";
import { sendNotificationToTopic } from "@/services/topic.service";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface INotificationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationDialog = ({ open, setOpen }: INotificationDialogProps) => {
  const { topics } = useContext(TopicContext);

  const [selectedTopic, setSelectedTopic] = useState<any>({ name: "", _id: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);

      const newNotification = await sendNotificationToTopic(selectedTopic._id, { message });

      if (newNotification.data) {
        onClose();
        toast.success("Sucesso: Notificação enviada!");
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
    setSelectedTopic({ name: "", _id: "" });
    setMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Enviar notificação</DialogTitle>
      <DialogContent>
        <DialogContentText>Escolha o tópico da notificação e escreva a messagem</DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Mensagem"
              fullWidth
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disableCloseOnSelect
              freeSolo
              options={topics}
              getOptionLabel={(option) => (option as any)?.name || ""}
              onChange={(e, newValue) => {
                if (newValue) setSelectedTopic(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecione um tópico"
                  label="Tópico"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSend} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress color="primary" size={12} /> : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
