import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("notify@user") || "{}");

  if (user && user.access_token) {
    config.headers["Authorization"] = `Bearer ${user.access_token}`;
  }

  return config;
});

// Arrumar esse interceptor
export const setupResponseInterceptor = (router: AppRouterInstance) => {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        router.replace("/login");
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export default api;
