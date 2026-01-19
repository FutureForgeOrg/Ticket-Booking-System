import { useShowDateStore } from "../../store/ShowsDateStore";
import { localDayKeyToIsoRange } from "../../utils/showsDateHelper";
import { useShowsOfMovieQuery } from "../../hooks/useShowsOfMovieQuery";
import { MovieDetails } from "./MovieDetails";
import { DateTabs } from "./DateTabs";
import { ShowsLoader } from "./ShowsLoader";
import { ShowsListingDetails } from "./ShowsListingDetails";

export default function ShowListing({ movieId }: { movieId: string }) {
  const { tabs, selectedDayKey } = useShowDateStore();
  const { startISO, endISO } = localDayKeyToIsoRange(selectedDayKey);

  const { data, isLoading, error, refetch, isFetching } = useShowsOfMovieQuery(
    movieId,
    startISO,
    endISO,
    selectedDayKey,
  );

  return (
    <div className="space-y-4 rounded-xl bg-canvas text-text-primary">
      {/* Movie details */}
      <MovieDetails isLoading={isLoading} data={data!} />

      {/* Date tabs */}
      <DateTabs tabs={tabs} />

      {/* Loading */}
      {isLoading && <ShowsLoader />}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-danger/40 bg-surface p-4 text-sm shadow-soft">
          <div className="font-semibold text-danger">Failed to load shows</div>
          <button
            className="mt-2 rounded-xl border border-border bg-canvas px-3 py-1 text-text-secondary hover:border-primary/40"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {/* List */}
      {!isLoading && !error && (
        <div className="space-y-3">
          {isFetching && (
            <div className="text-xs text-text-muted">Updating...</div>
          )}

          <ShowsListingDetails data={data!.data} />
        </div>
      )}
    </div>
  );
}
