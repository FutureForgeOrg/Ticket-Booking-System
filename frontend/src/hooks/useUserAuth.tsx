import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getMeApi, loginApi, logoutApi, signupApi, verifyOtpApi, resendOtpApi, type VerifyOtpPayload } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import type { SignupFormData, ResendOtpFormData } from "../schemas/auth.schema";

export const useGetUserAuth = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
  });

export function useSignup() {
  const navigate = useNavigate();
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);

  return useMutation({
    mutationFn: (data: SignupFormData) => signupApi(data),
    onSuccess: (data) => {
      setPendingEmail(data.user.email);
      navigate("/verify-otp");
    },
  });
}

export function useVerifyOtp() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => verifyOtpApi(data),
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
      setPendingEmail(null);
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpFormData) => resendOtpApi(data),
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear(); // clear all cached queries
      setUser(null);
      navigate("/login");
    },
  });
}
