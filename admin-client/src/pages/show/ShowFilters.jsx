import ReusableSelect from "@/components/common/ReuableSelect"
import useShowStore from "@/store/show.store"
import { cinemaApi } from "@/services/cinema.service";
import { movieApi } from "@/services/movie.service";
import { useEffect } from "react";


function ShowFilters() {

  const { filters, setFilters, movies, cinemas, setMovies, setCinemas } = useShowStore();

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

  const cinemaOptions = cinemas.map(cinema => ({
    label: cinema.name,
    value: cinema._id
  }));

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });

  };
  const clearAllFilters = () => {
    setFilters({
      movieId: undefined,
      cinemaId: undefined,
      status: undefined
    });
  };
  return (
    <>
      <div className="flex gap-3">
        <ReusableSelect
          placeholder="Movie"
          value={filters.movieId ?? undefined}
          onChange={(v) => handleChange("movieId", v)}
          options={[...movieOptions]}
        />

        <ReusableSelect
          placeholder="Cinema"
          value={filters.cinemaId ?? undefined}
          onChange={(v) => handleChange("cinemaId", v)}
          options={[...cinemaOptions]}
        />

        <ReusableSelect
          placeholder="Status"
          value={filters.status ?? undefined}
          onChange={(v) => handleChange("status", v)}
          options={[

            { label: "ACTIVE", value: "ACTIVE" },
            { label: "CANCELLED", value: "CANCELLED" },
            { label: "COMPLETED", value: "COMPLETED" }
          ]}
        />

        <button
          onClick={clearAllFilters}
          className="px-3 py-2 border rounded text-sm"
        >
          clear
        </button>
      </div>
    </>
  )
}

export default ShowFilters  