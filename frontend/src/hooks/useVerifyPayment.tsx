import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useVerifyPayment() {
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const res = await axiosInstance.post("/payment/verify-payment", payload);
      return res.data;
    },
  });
}
