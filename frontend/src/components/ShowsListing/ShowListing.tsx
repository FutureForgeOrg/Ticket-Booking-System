import { useQuery } from "@tanstack/react-query";
import { useShowDateStore } from "../../store/ShowsDateStore";
import type { GetShowsListingResponse } from "../../types/showListing.type";
import {
  formatLocalTime,
  localDayKeyToIsoRange,
} from "../../utils/showsDateHelper";
import { axiosInstance } from "../../lib/axiosInstance";

async function fetchShowsByDay(
  movieId: string,
  startISO: string,
  endISO: string,
) {
  const url = `/shows/movie/${movieId}?startDate=${encodeURIComponent(startISO)}&endDate=${encodeURIComponent(endISO)}`;
  const res = await axiosInstance.get<GetShowsListingResponse>(url);
  return res.data;
}

function availabilityMeta(available: number, total: number) {
  if (!total)
    return { label: "N/A", cls: "text-text-muted bg-surface border-border" };

  const pct = (available / total) * 100;

  if (pct <= 20) {
    return {
      label: "Fast filling",
      cls: "text-primary bg-primary-soft border-primary/30",
    };
  }

  return {
    label: "Available",
    cls: "text-secondary-DEFAULT bg-secondary-soft border-secondary/30",
  };
}

export default function ShowListing({ movieId }: { movieId: string }) {
  const { tabs, selectedDayKey, setSelectedDayKey } = useShowDateStore();

  const { startISO, endISO } = localDayKeyToIsoRange(selectedDayKey);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["shows", movieId, selectedDayKey],
    queryFn: () => fetchShowsByDay(movieId, startISO, endISO),
    enabled: !!movieId,
    staleTime: 30_000,
  });

  return (
    <div className="space-y-4 rounded-xl bg-canvas text-text-primary">
      {/* Movie details */}
      {isLoading && !data && (
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <div className="w-16 md:w-20 rounded-lg shadow-md">
            <div className="block animate-pulse w-18 h-32 rounded-lg bg-skeleton"></div>
          </div>
          <div className="space-y-2">
            <div className="text-lg sm:text-xl font-semibold">
              <span className="block w-32 h-6 rounded-lg bg-skeleton animate-pulse"></span>
            </div>
            <div className="text-sm text-text-muted">
              <span className="block w-20 h-4 rounded-lg bg-skeleton animate-pulse"></span>
            </div>
            <div className="text-sm text-text-muted mt-2">
              <span className="p-1 px-2">
                <span className="block w-16 h-4 rounded-lg bg-skeleton animate-pulse"></span>
              </span>
            </div>
          </div>
        </div>
      )}
      {data?.movie && (
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <img
            src={data.movie.posterUrl}
            alt={data.movie.title}
            className="w-16 md:w-20 rounded-lg shadow-md object-cover"
          />
          <div className="space-y-2">
            <div className="text-lg sm:text-xl font-semibold">
              {data.movie.title}
            </div>
            <div className="text-sm text-text-muted">
              {new Date(data.movie.releaseDate).getFullYear()} •{" "}
              {data.movie.runtime} mins
            </div>
            <div className="text-sm text-text-muted mt-2">
              {data.movie.genres.map((genre) => {
                return (
                  <span
                    key={genre}
                    className="border border-gray-500 mr-2 px-4 py-1 rounded-md"
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* Date tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => {
          const active = t.key === selectedDayKey;

          return (
            <button
              key={t.key}
              onClick={() => setSelectedDayKey(t.key)}
              className={[
                "min-w-[78px] rounded-xl border px-3 py-2 text-center transition",
                "focus:outline-none focus:shadow-focus",
                active
                  ? "border-primary bg-primary-soft text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-primary/40",
              ].join(" ")}
            >
              <div className="text-[11px] font-semibold tracking-wide opacity-90">
                {t.dow}
              </div>
              <div className="text-lg font-bold leading-5">{t.day}</div>
              <div className="text-[11px] font-semibold tracking-wide opacity-90">
                {t.mon}
              </div>
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-text-primary">
                    <div className="w-32 h-5 rounded-lg bg-skeleton animate-pulse"></div>
                  </div>
                  <div className="text-xs text-text-muted">
                    <div className="w-48 h-4 rounded-lg bg-skeleton animate-pulse mt-1"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="w-24 h-4 rounded-lg bg-skeleton animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-32 h-10 rounded-lg bg-skeleton animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

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

          {data?.data?.length ? (
            data.data.map((cinemaItem) => (
              <div
                key={cinemaItem._id}
                className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
              >
                {/* Cinema header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-text-primary">
                      {cinemaItem.cinema.name}
                    </div>
                    <div className="text-xs text-text-muted">
                      {cinemaItem.cinema.location.name},{" "}
                      {cinemaItem.cinema.location.city}
                    </div>
                  </div>
                </div>

                {/* Screens */}
                <div className="mt-4 space-y-4">
                  {cinemaItem.screens.map((screen) => (
                    <div key={screen.screenName} className="space-y-2">
                      <div className="text-xs font-medium text-text-secondary">
                        {screen.screenName}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {screen.shows.map((s) => {
                          const meta = availabilityMeta(
                            s.availableSeats,
                            s.totalSeats,
                          );

                          return (
                            <button
                              key={s._id}
                              className={[
                                "group rounded-xl border border-border bg-canvas px-3 py-2 text-left transition",
                                "hover:border-primary/40 hover:bg-surface",
                                "focus:outline-none focus:shadow-focus",
                              ].join(" ")}
                              onClick={() => {
                                // navigate(`/shows/${s._id}`)
                                console.log("showId:", s._id);
                              }}
                            >
                              {/* time */}
                              <div className="text-sm font-semibold text-text-primary">
                                {formatLocalTime(s.showTime)}
                              </div>

                              {/* meta row */}
                              <div className="mt-1 flex items-center gap-2">
                                <span
                                  className={[
                                    "rounded-xl border px-2 py-[2px] text-[10px] font-semibold",
                                    meta.cls,
                                  ].join(" ")}
                                >
                                  {meta.label}
                                </span>

                                <span className="text-[11px] text-text-muted">
                                  {s.availableSeats}/{s.totalSeats} seats
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted shadow-soft">
              No shows for this day.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
