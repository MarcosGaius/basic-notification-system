import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-w-screen min-h-screen h-screen w-screen flex justify-center items-center bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full px-4 py-4 md:px66 md:py-8 lg:py-0">
        <p className="flex items-center mb-6 text-lg font-black text-blue-100 bg-blue-500 px-2 py-2">
          NOTIFY
        </p>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login
            </h1>
            <LoginForm />
            <p className="text-sm font-light text-gray-500">
              Ainda não possui uma conta?{" "}
              <Link href="/register">
                <span className="font-medium text-blue-600 hover:underline">Criar conta</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
