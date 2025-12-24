import HorizontalCardList from "../../ui/HorizontalCardList";
import MovieCard from "../../ui/MovieCard";
import { trendingMovies } from "./mockdata";

export default function NewReleaseMovies() {
  return (
    <HorizontalCardList
      title="New Releases"
      items={trendingMovies}
      scrollAmount={400} // tweak per row
      renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
    />
  );
}
