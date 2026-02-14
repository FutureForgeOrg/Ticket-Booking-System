import { axiosInstance } from "../lib/axiosInstance";
import type { TicketResponse } from "../types/ticket.type";

export const fetchTicketById = async (
  ticketId: string,
): Promise<TicketResponse> => {
  const { data } = await axiosInstance.get<TicketResponse>(`/tickets/${ticketId}`);
  return data;
};
