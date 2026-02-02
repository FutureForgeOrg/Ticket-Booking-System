import { axiosInstance } from "../lib/axiosInstance";
import type { LoginFormData, SignupFormData } from "../schemas/auth.schema";

export const loginApi = async(data: LoginFormData) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const signupApi = async (data: SignupFormData) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const getMeApi = async () => {
  const res = await axiosInstance.get("/auth/user");
  return res.data;
}

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};
