import type { CinemaListingItem } from "../../types/showListing.type";
import { formatLocalTime } from "../../utils/showsDateHelper";
import { availabilityMetaBadge } from "./availabilityMetaBadge";

export interface ShowsListingDetailsProps {
  data: CinemaListingItem[];
}
export const ShowsListingDetails = ({ data }: ShowsListingDetailsProps) => {
  return (
    <>
      {data?.length ? (
        data.map((cinemaItem) => (
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
                      const meta = availabilityMetaBadge(
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
    </>
  );
};
