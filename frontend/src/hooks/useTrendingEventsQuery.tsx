import { useQuery } from "@tanstack/react-query";
import type { Event } from "../types/event.type";
import { fetchTrendingEvents } from "../api/event.api";

export const useTrendingEventsQuery = () =>
  useQuery<Event[]>({
    queryKey: ["trending-events"],
    queryFn: fetchTrendingEvents,
  });