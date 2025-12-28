import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import type { Movie } from "../types/movieType";

const fetchMovieById = async (movieId: string): Promise<Movie> => {
  const response = await axiosInstance.get(`/movies/${movieId}`);
  return response.data.data;
};

export const useGetMovieById = (movieId: string) =>
  useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId),
  });
