import { useQuery } from "@tanstack/react-query";
import { fetchEventBookingById } from "../api/eventBooking.api";

export default function useEventBookingQuery(bookingId: string) {
  return useQuery({
    queryKey: ["event-booking", bookingId],
    queryFn: () => fetchEventBookingById(bookingId),
  });
}
