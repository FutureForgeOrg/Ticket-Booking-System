import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useCancelEventBooking() {
  return useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await axiosInstance.put(`/events/cancel/${bookingId}`);
      return res.data;
    },
  });
}
