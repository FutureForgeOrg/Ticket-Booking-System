import { useParams } from "react-router-dom";
import ShowListing from "../components/ShowsListing/ShowListing";

export default function MovieShows() {
  const { movieId } = useParams();
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {movieId && <ShowListing movieId={movieId} />}
    </div>
  );
}
