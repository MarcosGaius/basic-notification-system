"use client";

import Header from "@/components/Header";
import { Button } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import NotificationDialog from "@/components/NotificationDialog";
import { useState } from "react";
import NotificationList from "@/components/NotificationList";

import useAuthRoute from "@/hooks/useAuthRoute";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  useAuthRoute();

  return (
    <>
      <Header />
      <main className="max-w-[1300px] w-full mx-auto px-4 py-8">
        <section className="flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-0 mb-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-slate-900">Notificações</h1>
              <h2 className="text-sm font-normal text-slate-500">
                Veja notificações recebidas e envie novas notificações
              </h2>
            </div>
            <Button
              variant="contained"
              color="info"
              className="bg-blue-500 w-full md:w-auto"
              endIcon={<CircleNotificationsIcon />}
              onClick={() => setOpen(true)}
            >
              Enviar notificação
            </Button>
          </div>
          <div className="flex mt-2 max-h-screen">
            <NotificationList />
          </div>
        </section>
      </main>
      <NotificationDialog open={open} setOpen={setOpen} />
    </>
  );
}
