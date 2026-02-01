import { useMutation, useQuery } from "@tanstack/react-query";
import { getMeApi, loginApi, logoutApi, signupApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import type { SignupFormData } from "../schemas/auth.schema";

export const useGetUserAuth = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
  });

export function useSignup() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: SignupFormData) => signupApi(data),
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/dashboard");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/dashboard");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUser(null);
      navigate("/login");
    },
  });
}


