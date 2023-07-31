import Button from "@/components/Button";
import Header from "@/components/Header";

export default function TopicPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1300px] w-full mx-auto px-4 py-8">
        <section className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold text-slate-900">Tópicos</h1>
            <Button type="button" className="w-[170px]">
              Criar tópico
            </Button>
          </div>
          <div className="mt-2">Lista de tópicos</div>
        </section>
      </main>
    </>
  );
}
