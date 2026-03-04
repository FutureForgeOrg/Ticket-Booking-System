import { useAllMoviesQuery } from "../../../hooks/getAllMoviesQuery";
import HorizontalCardList from "../../ui/HorizontalCardList";
import MovieCard from "../../ui/MovieCard";

export default function NewReleaseMovies() {
  const { data: allMovies, isLoading, error } = useAllMoviesQuery();
  return (
    <HorizontalCardList
      title="New Releases"
      items={allMovies ?? []}
      scrollAmount={400}
      renderItem={(movie) => <MovieCard key={movie._id} movie={movie} />}
      loading={isLoading}
      error={error as Error | null}
      showAllLink="/movies/all"
    />
  );
}
