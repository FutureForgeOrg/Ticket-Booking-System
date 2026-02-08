import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (amount: number) => {
      const res = await axiosInstance.post("/payment/create-order", { amount });
      return res.data.order;
    },
  });
}
