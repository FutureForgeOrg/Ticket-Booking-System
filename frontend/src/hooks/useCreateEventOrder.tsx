import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useCreateEventOrder() {
  return useMutation({
    mutationFn: async (payload: { bookingId: string }) => {
      const res = await axiosInstance.post("/payment-for-event/create-order-for-event", payload);
      return res.data.order;
    },
  });
}
