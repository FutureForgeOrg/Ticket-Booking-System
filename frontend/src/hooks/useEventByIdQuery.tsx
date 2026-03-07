import { useQuery } from "@tanstack/react-query";
import { type Event } from "../types/event.type";
import { fetchEventById } from "../api/event.api";

export default function useEventByIdQuery(eventId: string) {
  return useQuery<Event>({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventById(eventId),
  });
}
