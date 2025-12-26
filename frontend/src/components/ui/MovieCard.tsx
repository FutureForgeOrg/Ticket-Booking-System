import type { Movie } from "../../types/movieType";
import Button from "./Button";
import Card from "./Card";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="w-52 shrink-0 overflow-hidden">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-96 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-text-muted">
          {movie.year} • {movie.genres.join(", ")}
        </p>

        <Button size="sm" className="mt-4 w-full">
          Book Now
        </Button>
      </div>
    </Card>
  );
}
