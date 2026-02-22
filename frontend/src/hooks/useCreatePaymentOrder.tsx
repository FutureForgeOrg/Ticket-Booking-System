import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: {
      amount: number;
      ticketId: string;
      showId: string;
    }) => {
      const res = await axiosInstance.post("/payment/create-order", {
        amount: payload.amount,
        ticketId: payload.ticketId,
        showId: payload.showId,
      });
      return res.data.order;
    },
  });
}
