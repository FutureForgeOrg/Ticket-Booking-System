import { useParams } from "react-router-dom";
import { useGetMovieById } from "../hooks/getMovieByIdQuery";
import Button from "../components/ui/Button";

export default function MovieDetail() {
  const { movieId } = useParams();
  const { data: movie, isLoading, error } = useGetMovieById(movieId as string);

  if (isLoading) return <p>Loading...</p>;
  if (error || !movie) return <p>Something went wrong</p>;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* ---------- BANNER + OVERLAY CONTENT ---------- */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[400px] overflow-hidden">
        {/* Banner */}
        <img
          src={movie.bannerUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />

        {/* Content on top */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center gap-6 md:gap-10">
          {/* Poster */}
          {movie.posterUrl && (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="hidden sm:block w-36 md:w-[200px] rounded-2xl shadow-2xl object-cover"
            />
          )}

          {/* Title + info */}
          <div className="text-white space-y-4 flex-1 max-w-md">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              {movie.title}
            </h1>

            {movie.genres?.length > 0 && (
              <p className="text-gray-300 text-sm md:text-base">
                {movie.genres.map((genre) => {
                  return (
                    <span
                      key={genre}
                      className="border border-gray-500 mr-2 px-4 py-1 rounded-md"
                    >
                      {genre}
                    </span>
                  );
                })}
              </p>
            )}

            <div className="text-sm md:text-base space-x-3">
              {movie.runtime && <span>{movie.runtime} mins</span>}
              {movie.runtime && <span>•</span>}
              <span>{new Date(movie.releaseDate).toDateString()}</span>
            </div>

            <Button variant="primary" className="mt-3" size="lg">
              Book Tickets
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- DETAILS ---------- */}
      <div className="mt-10 space-y-4 px-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          About The Movie
        </h2>
        <p className="leading-relaxed text-text-primary text-md max-w-2xl">
          {movie.plot}
        </p>

        <h2 className="text-2xl font-semibold text-text-primary">Director</h2>
        <div
          key={movie.director}
          className="flex flex-col items-center gap-2 w-20 text-center "
        >
          <img
            src="/film-director.png"
            alt="director image"
            className="w-20 border border-gray-400 p-1 rounded-md"
          />

          <p className="text-text-primary text-md leading-tight line-clamp-2">
            {movie.director.trim()}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary">Cast</h2>

        <div className="flex flex-wrap gap-8">
          {movie.actors.split(",").map((actor) => (
            <div
              key={actor}
              className="flex flex-col items-center gap-2 w-20 text-center"
            >
              <img
                src="/actor.png"
                alt="actor image"
                className="w-20 border border-gray-400 p-1 rounded-md"
              />

              <p className="text-text-primary text-md leading-tight">
                {actor.trim()}
              </p>
            </div>
          ))}
        </div>

        <p>
          <span className="font-semibold">Likes:</span> {movie.likesCount}
        </p>
      </div>

      {/* ---------- TRAILER ---------- */}
      {movie.trailerUrl && (
        <div className="mt-10 flex justify-start px-4">
          <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={
                movie.trailerUrl.includes("embed")
                  ? movie.trailerUrl
                  : movie.trailerUrl.replace("watch?v=", "embed/")
              }
              title={`${movie.title} Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
