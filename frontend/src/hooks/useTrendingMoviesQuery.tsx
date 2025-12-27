import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { type Movie } from "../types/movieType";

const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get("/movies/trending");
  return response.data.data;
};

export function useTrendingMoviesQuery() {
  return useQuery<Movie[]>({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}
