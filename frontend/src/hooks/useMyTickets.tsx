import { useQuery } from "@tanstack/react-query";
import type { MyTicketsResponse } from "../types/userTicket.type";
import { fetchMyTickets } from "../api/ticket.api";

export const useMyTicketsQuery = () =>
  useQuery<MyTicketsResponse>({
    queryKey: ["my-tickets"],
    queryFn: fetchMyTickets,
  });
