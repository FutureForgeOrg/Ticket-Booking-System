import HorizontalCardList from "../../ui/HorizontalCardList";
import MovieCard from "../../ui/MovieCard";
import { trendingMovies } from "./mockdata";

export default function TrendingMovies() {
  return (
    <HorizontalCardList
      title="Trending Movies"
      items={trendingMovies}
      renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
    />
  );
}
