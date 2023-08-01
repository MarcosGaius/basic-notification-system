import { IUserCreateData } from "@/types/user.types";
import api from ".";

export const createUserRequest = async (data: IUserCreateData) => {
  try {
    const response = await api.post("/users", data);

    return response;
  } catch (e) {
    throw e;
  }
};

export const loginUserRequest = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (e) {
    throw e;
  }
};
