import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { type Movie } from "../types/movieType";

const fetchAllMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get("/movies");
  return response.data.data;
};

export function useAllMoviesQuery() {
  return useQuery<Movie[]>({
    queryKey: ["all-movies"],
    queryFn: fetchAllMovies,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}
