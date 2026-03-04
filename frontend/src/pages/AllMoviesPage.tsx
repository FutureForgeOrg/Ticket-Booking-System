import { useEffect, useRef } from "react";
import { useInfiniteMoviesQuery } from "../hooks/useInfiniteMoviesQuery";
import MovieCard from "../components/ui/MovieCard";
import { Link } from "react-router-dom";

export default function AllMoviesPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMoviesQuery();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <Link
              to="/"
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="mt-4 text-3xl font-bold">All Movies</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl bg-skeleton"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <Link
              to="/"
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="mt-4 text-3xl font-bold">All Movies</h1>
          </div>
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-red-400">
            <p>Error loading movies: {error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const allMovies = data?.pages.flatMap((page: any) => page.data) ?? [];

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold">All Movies</h1>
          <p className="mt-2 text-text-secondary">
            Discover all available movies in our collection
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 xl:gap-4">
          {allMovies.map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* Loading indicator */}
        {isFetchingNextPage && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-text-secondary">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Loading more movies...
            </div>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={loadMoreRef} className="h-10" />

        {/* End message */}
        {!hasNextPage && allMovies.length > 0 && (
          <div className="mt-8 text-center text-text-muted">
            You've reached the end of our movie collection!
          </div>
        )}
      </div>
    </div>
  );
}