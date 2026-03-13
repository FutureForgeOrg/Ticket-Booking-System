import { axiosInstance } from "../lib/axiosInstance";
import type { BookEventSeatsResponse, EventBookingResponse, MyEventBookingsResponse } from "../types/eventBooking.type";

export const bookEventSeats = async (payload: {
  eventId: string;
  category: string;
  numberOfSeats: number;
}): Promise<BookEventSeatsResponse> => {
  const { data } = await axiosInstance.post<BookEventSeatsResponse>("/events/book", payload);
  return data;
};

export const fetchEventBookingById = async (bookingId: string): Promise<EventBookingResponse> => {
  const { data } = await axiosInstance.get<EventBookingResponse>(`/events/bookings/${bookingId}`);
  return data;
};

export const fetchMyEventBookings = async (): Promise<MyEventBookingsResponse> => {
  const { data } = await axiosInstance.get<MyEventBookingsResponse>("/events/my-bookings");
  return data;
};
