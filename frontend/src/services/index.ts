import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/providers/Auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const { user, logout } = useContext(AuthContext);

  if (user && user.access_token) {
    config.headers["Authorization"] = `Bearer ${user.access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { logout } = useContext(AuthContext);

    if (error.response && error.response.status === 401) {
      logout("Sessão expirada. Entre novamente");
    }
    return Promise.reject(error);
  }
);

export default api;
