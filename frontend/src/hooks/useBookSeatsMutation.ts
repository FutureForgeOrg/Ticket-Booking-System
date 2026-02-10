import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

type BookSeatsPayload = {
  showId: string;
  seatIds: string[];
};

export function useBookSeatsMutation() {
  return useMutation({
    mutationFn: async (payload: BookSeatsPayload) => {
      const res = await axiosInstance.post("/tickets/book-seats", payload);
      return res.data;
    },
  });
}
