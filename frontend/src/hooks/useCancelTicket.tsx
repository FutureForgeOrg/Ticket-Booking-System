import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export function useCancelTicket(showId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketId: string) => {
      const res = await axiosInstance.post(`/tickets/cancel-ticket`, {
        ticketId,
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["show-seats", showId],
      });
    },
  });
}