import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movieType";
import Button from "./Button";
import Card from "./Card";
// import { useCityStore } from "../../store/cityStore";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  // const { city: selectedCity } = useCityStore();
  return (
    <Card className="w-52 shrink-0 overflow-hidden">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-80 w-full object-cover"
      />

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold leading-tight line-clamp-1">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-text-muted line-clamp-1">
          {new Date(movie.releaseDate).toLocaleDateString()} •{" "}
          {(movie.genres ?? []).join(", ")}
        </p>

        <Button
          size="sm"
          className="mt-4 w-full"
          onClick={() => {
            // const formatSelectedCity = selectedCity.toLowerCase();
            navigate(`/movies/${movie._id}`);
          }}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
