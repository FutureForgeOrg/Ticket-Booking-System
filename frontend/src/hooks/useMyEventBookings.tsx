import { useQuery } from "@tanstack/react-query";
import type { MyEventBookingsResponse } from "../types/eventBooking.type";
import { fetchMyEventBookings } from "../api/eventBooking.api";

export const useMyEventBookingsQuery = () =>
  useQuery<MyEventBookingsResponse>({
    queryKey: ["my-event-bookings"],
    queryFn: fetchMyEventBookings,
  });