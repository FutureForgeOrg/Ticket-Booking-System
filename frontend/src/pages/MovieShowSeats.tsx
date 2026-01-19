import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import type { ShowByIdResponse } from "../types/showById.type";
import { formatLocalTime } from "../utils/showsDateHelper";
import SeatMap from "../components/ShowSeatsBooking/SeatMap";
import SeatSummary from "../components/ShowSeatsBooking/SeatSummary";

async function fetchShowById(showId: string) {
  const res = await axiosInstance.get<ShowByIdResponse>(`/shows/${showId}`);
  return res.data;
}

export default function MovieShowSeats() {
  const { showId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["showById", showId],
    queryFn: () => fetchShowById(showId!),
    enabled: !!showId,
    staleTime: 10_000,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted shadow-soft">
        Loading seats...
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="rounded-xl border border-danger/40 bg-surface p-4 text-sm text-danger shadow-soft">
        Failed to load seats.
      </div>
    );
  }

  const show = data.data;

  return (
    <div className="space-y-4 bg-canvas text-text-primary">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
        <div className="text-lg font-bold">{show.movie.title}</div>
        <div className="text-sm text-text-secondary">
          {show.cinema.name} • {show.screenName}
        </div>
        <div className="text-xs text-text-muted">
          {formatLocalTime(show.showTime)} – {formatLocalTime(show.endTime)}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <SeatMap seats={show.seats} />
        <SeatSummary price={show.price} />
      </div>
    </div>
  );
}
