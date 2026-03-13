import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useVerifyEventPayment() {
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const res = await axiosInstance.post("/payment-for-event/verify-payment-for-event", payload);
      return res.data;
    },
  });
}
