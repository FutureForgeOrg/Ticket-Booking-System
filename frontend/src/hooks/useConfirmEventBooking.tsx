import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useConfirmEventBooking() {
  return useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await axiosInstance.post(`/events/confirm/${bookingId}`);
      return res.data;
    },
  });
}
