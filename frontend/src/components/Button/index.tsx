import { ButtonHTMLAttributes, ReactNode } from "react";
import { CircularProgress } from "@mui/material";

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
      disabled={loading}
      className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-200 ${className}`}
    >
      {loading ? <CircularProgress color="primary" size={12} /> : children}
    </button>
  );
}
