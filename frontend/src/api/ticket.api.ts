import { axiosInstance } from "../lib/axiosInstance";
import type { TicketResponse } from "../types/ticket.type";
import type { MyTicketsResponse } from "../types/userTicket.type";

export const fetchTicketById = async (
  ticketId: string,
): Promise<TicketResponse> => {
  const { data } = await axiosInstance.get<TicketResponse>(
    `/tickets/${ticketId}`,
  );
  return data;
};

export const fetchMyTickets = async () => {
  const { data } = await axiosInstance.get<MyTicketsResponse>(
    "/tickets/my-tickets",
  );
  return data;
};
