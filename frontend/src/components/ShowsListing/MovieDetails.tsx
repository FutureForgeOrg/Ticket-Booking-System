import type { GetShowsListingResponse } from "../../types/showListing.type";

type MovieDetailsProps = {
  isLoading: boolean;
  data?: GetShowsListingResponse;
};

export const MovieDetails = ({ isLoading, data }: MovieDetailsProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <div className="w-16 md:w-20 rounded-lg shadow-md">
          <div className="block animate-pulse w-16 h-32 rounded-lg bg-skeleton" />
        </div>
        <div className="space-y-2">
          <span className="block w-32 h-6 rounded-lg bg-skeleton animate-pulse" />
          <span className="block w-20 h-4 rounded-lg bg-skeleton animate-pulse" />
          <span className="block w-16 h-4 rounded-lg bg-skeleton animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data?.movie) {
    return (
      <div className="p-4 text-text-muted">Movie details not available.</div>
    );
  }

  const { movie } = data;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-border">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-16 md:w-20 rounded-lg shadow-md object-cover"
      />
      <div className="space-y-2">
        <div className="text-lg sm:text-xl font-semibold">{movie.title}</div>
        <div className="text-sm text-text-muted">
          {new Date(movie.releaseDate).getFullYear()} • {movie.runtime} mins
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="border border-gray-500 px-3 py-1 rounded-md text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
