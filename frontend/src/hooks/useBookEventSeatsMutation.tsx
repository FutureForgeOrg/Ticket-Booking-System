import { useMutation } from "@tanstack/react-query";
import { bookEventSeats } from "../api/eventBooking.api";

export function useBookEventSeatsMutation() {
  return useMutation({
    mutationFn: bookEventSeats,
  });
}
