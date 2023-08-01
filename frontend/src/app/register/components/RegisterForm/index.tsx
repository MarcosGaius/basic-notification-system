"use client";

import { ReactNode, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserRequest } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface IRegisterFormProps {
  children?: ReactNode;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório."),
  email: yup.string().email("E-mail inválido.").required("E-mail é um campo obrigatório."),
  password: yup
    .string()
    .required("Senha é um campo obrigatório.")
    .matches(/(?=.*\d)/, "Sua senha deve conter ao menos um dígito.")
    .matches(/(?=.*[a-z])/, "Sua senha deve conter ao menos uma letra minúscula.")
    .matches(/(?=.*[A-Z])/, "Sua senha deve conter ao menos uma letra maiúscula.")
    .matches(/(?=.*[.$*&@#!?])/, "Sua senha deve conter ao menos um caractere especial.")
    .matches(/(?=.*\d)/, "Sua senha deve conter ao menos um dígito.")
    .matches(/[0-9a-zA-Z$*&@#]{8,}/, "Sua senha deve ter no mínimo 8 caracteres."),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password")], "As senhas não coincidem."),
});

export default function RegisterForm({ children }: IRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      setIsLoading(true);

      const reqData = { ...data };
      delete reqData.confirmPassword;

      const response = await createUserRequest({ ...reqData });

      if (response) {
        toast.success("Registro bem sucedido!");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
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
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleRegister)}>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
          Nome
        </label>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          type="text"
          placeholder="Nome Sobrenome"
          {...register("name")}
          error={!!errors.name?.message}
          helperText={errors.name?.message ? <span>{errors.name?.message}</span> : ""}
        />
      </div>
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
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">
          Confime sua senha
        </label>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword?.message}
          helperText={
            errors.confirmPassword?.message ? <span>{errors.confirmPassword?.message}</span> : ""
          }
        />
      </div>
      <Button loading={isLoading} type="submit">
        Registrar-se
      </Button>
    </form>
  );
}
