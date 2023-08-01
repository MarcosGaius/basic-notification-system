import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-w-screen min-h-screen p-1 sm:p-10 flex justify-center items-center bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full px-6 py-8 lg:py-0">
        <p className="flex items-center mb-6 text-lg font-black text-blue-100 bg-blue-500 px-2 py-2">
          NOTIFY
        </p>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Registro
            </h1>
            <RegisterForm />
            <p className="text-sm font-light text-gray-500">
              Já possui uma conta?{" "}
              <Link href="/login">
                <span className="font-medium text-blue-600 hover:underline">Entrar</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
