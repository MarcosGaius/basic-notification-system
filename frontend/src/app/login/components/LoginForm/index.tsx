"use client";

import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@/components/Button";
import { loginUserRequest } from "@/services/auth.service";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { AuthContext } from "@/providers/Auth";

interface ILoginFormProps {
  children?: ReactNode;
}

const schema = yup.object().shape({
  email: yup.string().required("Nome é um campo obrigatório."),
  password: yup.string().required("Senha é um campo obrigatório."),
});

export default function LoginForm({ children }: ILoginFormProps) {
  const { login, isLoading, setIsLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: { password: string; email: string }) => {
    try {
      setIsLoading(true);

      const user = await loginUserRequest(data);
      if (user) login(user.data);
    } catch (error) {
      let message = "Erro: Houve um erro ao cadastrar-se. Tente novamente.";

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

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
          E-mail
        </label>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          type="email"
          placeholder="nome@email.com"
          {...register("email")}
          error={!!errors.email?.message}
          helperText={errors.email?.message ? <span>{errors.email?.message}</span> : ""}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
          Senha
        </label>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message ? <span>{errors.password?.message}</span> : ""}
        />
      </div>
      <Button loading={isLoading} type="submit">
        Entrar
      </Button>
    </form>
  );
}
