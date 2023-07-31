import Button from "@/components/Button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1300px] w-full mx-auto px-4 py-8">
        <section className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold text-slate-900">Notificações</h1>
            <Button type="button" className="w-[170px]">
              Enviar notificação
            </Button>
          </div>
          <div className="mt-2">Lista de notificações</div>
        </section>
      </main>
    </>
  );
}

// Criar tela e lógica de registro
// Utilizar hookform nos forms de registro e login
// Terminar lógica de auth (toast, requisições da API)
// Adicionar listagem de notificações e adicionar modal de enviar notificação (fazer parecido com um chat)
// Listagem de tópicos e opção de se inscrever na lista, impedir desinscrição. Adicionar modal de criação de tópico
// Provider que armazena as notificações e seta o websocket e mostra toast e atualiza notificações quando recebe
// Integrar chamadas pra API
// Verificar responsividade
