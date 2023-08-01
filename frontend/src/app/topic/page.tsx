"use client";

import Header from "@/components/Header";
import { Button } from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import { useEffect, useState } from "react";
import TopicDialog from "@/components/TopicDialog";
import TopicList from "@/components/TopicList";
import { useRouter } from "next/router";
import useAuthRoute from "@/hooks/useAuthRoute";

export default function TopicPage() {
  const [open, setOpen] = useState(false);

  useAuthRoute();

  return (
    <>
      <Header />
      <main className="max-w-[1300px] w-full mx-auto px-4 py-8">
        <section className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-slate-900">Tópicos</h1>
              <h2 className="text-sm font-normal text-slate-500">
                Se inscreva em tópicos e crie tópicos
              </h2>
            </div>
            <Button
              variant="contained"
              color="info"
              className="bg-blue-500 w-full md:w-auto"
              endIcon={<TopicIcon />}
              onClick={() => setOpen(true)}
            >
              Criar tópico
            </Button>
          </div>
          <div className="flex mt-2 max-h-screen">
            <TopicList />
          </div>
        </section>
      </main>
      <TopicDialog open={open} setOpen={setOpen} />
    </>
  );
}
