import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import type { GetShowsListingResponse } from "../types/showListing.type";

async function fetchShowsByDay(
  movieId: string,
  startISO: string,
  endISO: string,
) {
  const url = `/shows/movie/${movieId}?startDate=${encodeURIComponent(startISO)}&endDate=${encodeURIComponent(endISO)}`;
  const res = await axiosInstance.get<GetShowsListingResponse>(url);
  return res.data;
}

export function useShowsOfMovieQuery(
  movieId: string,
  startISO: string,
  endISO: string,
  selectedDayKey: string,
) {
  return useQuery({
    queryKey: ["shows", movieId, selectedDayKey],
    queryFn: () => fetchShowsByDay(movieId, startISO, endISO),
    enabled: !!movieId,
    staleTime: 30_000,
  });
}
