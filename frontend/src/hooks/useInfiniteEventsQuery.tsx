import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import type { Event } from "../types/event.type";

interface PaginatedEventsResponse {
  success: boolean;
  count: number;
  data: Event[];
  totalPages: number;
  currentPage: number;
}

const fetchEventsPage = async (context: any): Promise<PaginatedEventsResponse> => {
  const response = await axiosInstance.get(
    `/events?page=${context.pageParam || 1}&limit=5`
  );

  return response.data;
};

export function useInfiniteEventsQuery() {
  return useInfiniteQuery<PaginatedEventsResponse, Error>({
    queryKey: ["events-infinite"],
    queryFn: fetchEventsPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 15,
  });
}