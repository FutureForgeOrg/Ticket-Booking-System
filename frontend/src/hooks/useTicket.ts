import { useQuery } from "@tanstack/react-query";
import type { TicketResponse } from "../types/ticket.type";
import { fetchTicketById } from "../api/ticket.api";

export const useTicket = (ticketId: string) => {
  return useQuery<TicketResponse>({
    queryKey: ["ticket", ticketId],
    queryFn: () => fetchTicketById(ticketId),
    enabled: !!ticketId, // prevents running if undefined
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
