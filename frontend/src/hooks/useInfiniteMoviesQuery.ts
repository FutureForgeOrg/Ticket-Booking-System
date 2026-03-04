import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { type Movie } from "../types/movieType";

interface PaginatedMoviesResponse {
  success: boolean;
  count: number;
  data: Movie[];
  totalPages: number;
  currentPage: number;
}

const fetchMoviesPage = async (context: any): Promise<PaginatedMoviesResponse> => {
  const response = await axiosInstance.get(`/movies?page=${context.pageParam || 1}&limit=5`);
  return response.data;
};

export function useInfiniteMoviesQuery() {
  return useInfiniteQuery<PaginatedMoviesResponse, Error>({
    queryKey: ["movies-infinite"],
    queryFn: fetchMoviesPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}