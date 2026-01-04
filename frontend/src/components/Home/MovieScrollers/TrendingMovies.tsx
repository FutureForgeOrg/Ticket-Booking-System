import HorizontalCardList from "../../ui/HorizontalCardList";
import MovieCard from "../../ui/MovieCard";
import { useTrendingMoviesQuery } from "../../../hooks/useTrendingMoviesQuery";


export default function TrendingMovies() {
  const { data: trendingMovies, isLoading, error } = useTrendingMoviesQuery();
  return (
    <HorizontalCardList
      title="Trending Movies"
      items={trendingMovies ?? []}
      renderItem={(movie) => <MovieCard key={movie._id} movie={movie} />}
      loading={isLoading}
      error={error as Error | null}
    />
  );
}
