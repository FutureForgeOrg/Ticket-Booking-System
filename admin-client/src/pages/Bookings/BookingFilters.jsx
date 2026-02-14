import ReusableSelect from "@/components/common/ReuableSelect";
import useTicketStore from "@/store/ticket.store";
import { movieApi } from "@/services/movie.service";
import { cinemaApi } from "@/services/cinema.service";
import { useEffect } from "react";

const options = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Expired", value: "EXPIRED" },
];

export default function BookingFilters() {
  const { filters, setFilters, movies, setMovies,cinemas,setCinemas } = useTicketStore();
  useEffect(() => {
    async function fetchMoviesAndCinemas() {
      const moviesRes = await movieApi.getAllMovies();

      setMovies(moviesRes.data.data);
       const cinemasRes = await cinemaApi.getAllCinemas();
       setCinemas(cinemasRes.data.data);
    }
    fetchMoviesAndCinemas();
  }, []);
  const movieOptions = movies.map(movie => ({
    label: movie.title,
    value: movie._id
  }));
  const cinemaOptions=cinemas.map(cinema=>({
    label:cinema.name,
    value:cinema._id
  }))

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });

  };
  const clearFilter = () => {
    setFilters({
      status: undefined,
      movie: undefined,
      cinema:undefined,
    })
  }
  return (
    <div className="flex m-5 gap-4">
      <ReusableSelect
        options={options}
        placeholder="Status"
        value={filters.status ?? ""}
        onChange={(value) =>
          setFilters({ status: value })
        }
        className="max-w-40 mb-3 font-semibold"
      />
      <ReusableSelect
        placeholder="Movie"
        value={filters.movieId ?? ""}
        onChange={(v) => handleChange("movieId", v)}
        options={[...movieOptions]}
      />
      <ReusableSelect
        placeholder="Cinema"
        value={filters.cinemaId ?? ""}
        onChange={(v) => handleChange("cinemaId", v)}
        options={[...cinemaOptions]}
      />

      <button
        onClick={clearFilter}
        className="px-3 py-2 border rounded text-sm h-9"
      >
        clear
      </button>
    </div>

  );
}
