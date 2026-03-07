import { useQuery } from "@tanstack/react-query";
import type { Event } from "../types/event.type";
import { fetchEvents } from "../api/event.api";

export const useEventsQuery = () =>
  useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
