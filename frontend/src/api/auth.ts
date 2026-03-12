import { axiosInstance } from "../lib/axiosInstance";
import type { LoginFormData, SignupFormData, ResendOtpFormData } from "../schemas/auth.schema";

// payload used when sending otp and email together
export type VerifyOtpPayload = { email: string; otp: string };

export const loginApi = async(data: LoginFormData) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const signupApi = async (data: SignupFormData) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const verifyOtpApi = async (data: VerifyOtpPayload) => {
  const res = await axiosInstance.post("/auth/verify-otp", data);
  return res.data;
};

export const resendOtpApi = async (data: ResendOtpFormData) => {
  const res = await axiosInstance.post("/auth/resend-otp", data);
  return res.data;
};

export const getMeApi = async () => {
  const res = await axiosInstance.get("/auth/user");
  return res.data;
}

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};
