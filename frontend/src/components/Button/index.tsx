import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  className = "",
  ...rest
}: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
    >
      {loading ? "TROCAR PELO MUI" : children}
    </button>
  );
}
