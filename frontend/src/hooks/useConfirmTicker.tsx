import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useConfirmTicket() {
  return useMutation({
    mutationFn: async (ticketId: string) => {
      const res = await axiosInstance.post(`/tickets/confirm-ticket/${ticketId}`);
      return res.data;
    },
  });
}
