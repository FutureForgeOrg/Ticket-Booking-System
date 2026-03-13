import type { Event } from "./event.type";

export type EventBookingStatus = "PENDING" | "CONFIRMED" | "EXPIRED" | "CANCELLED";

export interface EventBooking {
  _id: string;
  event: string | Event;
  category: string;
  numberOfSeats: number;
  totalAmount: number;
  status: EventBookingStatus;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookEventSeatsResponse {
  success: boolean;
  message: string;
  bookingId: string;
  totalAmount: number;
  expiresAt: string;
}

export interface EventBookingResponse {
  success: boolean;
  booking: EventBooking;
}

export interface MyEventBookingsResponse {
  success: boolean;
  message: string;
  data: (EventBooking & { event: Event })[];
}
