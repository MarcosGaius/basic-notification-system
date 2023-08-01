import React, { useCallback, useContext } from "react";
import { CircularProgress, Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTimeFilled";
import { NotificationContext } from "@/providers/Notification";

export default function NotificationList() {
  const { notifications, isLoading } = useContext(NotificationContext);

  const isRecentMessage = useCallback((createdAt: Date) => {
    const now = new Date();
    const messageTime = createdAt;
    const differenceInMinutes: number = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    return differenceInMinutes < 1;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 mx-auto mt-10">
        <CircularProgress size={16} />
        <small>Carregando...</small>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full p-1 max-h-screen overflow-auto">
      {notifications.map((message, index) => (
        <div key={index}>
          <Paper elevation={3} className="p-2 bg-blue-100 rounded-md">
            <Typography variant="body1" className="text-blue-500">
              {message.content}
            </Typography>
            <Typography variant="caption" className="text-gray-600">
              {isRecentMessage(new Date(message.createdAt)) && (
                <AccessTimeIcon fontSize="small" className="mr-1" />
              )}
              {new Date(message.createdAt).toLocaleString()}
              {` - ${message.sender.name}`}
            </Typography>
          </Paper>
        </div>
      ))}
    </div>
  );
}
