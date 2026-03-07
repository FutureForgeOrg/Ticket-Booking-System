import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInfiniteEventsQuery } from "../hooks/useInfiniteEventsQuery";
import EventCard from "../components/ui/EventCard";

export default function AllEventsPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteEventsQuery();

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
          <Link to="/" className="text-primary text-sm">
            ← Back to Home
          </Link>

          <h1 className="mt-4 text-3xl font-bold">All Events</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-skeleton" />
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
          <Link to="/" className="text-primary text-sm">
            ← Back to Home
          </Link>

          <h1 className="mt-4 text-3xl font-bold">All Events</h1>

          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-red-400 mt-6">
            Error loading events: {error?.message}
          </div>
        </div>
      </div>
    );
  }

  const allEvents = data?.pages.flatMap((page: any) => page.events) ?? [];

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

          <h1 className="mt-4 text-3xl font-bold">All Events</h1>

          <p className="mt-2 text-text-secondary">
            Discover all upcoming events and live shows
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 xl:gap-4">
          {allEvents.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {isFetchingNextPage && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-text-secondary">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Loading more events...
            </div>
          </div>
        )}

        <div ref={loadMoreRef} className="h-10" />

        {!hasNextPage && allEvents.length > 0 && (
          <div className="mt-8 text-center text-text-muted">
            You've reached the end of available events!
          </div>
        )}

      </div>
    </div>
  );
}