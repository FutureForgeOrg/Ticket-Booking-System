import { useParams } from "react-router-dom";
import { useSeatStore } from "../store/seatStore";
import { useShowSeatsQuery } from "../hooks/useShowsSeatsQuery";
import SeatGrid from "../components/ShowSeatsBooking/SeatGrid";
import { ZoomableLayout } from "../components/ShowSeatsBooking/SeatLens";
import MovieCinemaSeatHeader from "../components/ShowSeatsBooking/MovieCinemaSeatHeader";

export default function ShowSeatPage() {
  const { showId = "" } = useParams();
  const { data, isLoading, error } = useShowSeatsQuery(showId);

  const selected = useSeatStore((s) => s.selected);
  const selectedList = Object.values(selected);

  if (isLoading) return <div className="p-6">Loading seats...</div>;
  if (error || !data?.success)
    return <div className="p-6">Failed to load.</div>;

  const show = data.data;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      {/* header */}
      <MovieCinemaSeatHeader show={show} />

      {/* seats grid */}
      <div className="px-16 py-4">
        <ZoomableLayout>
          <SeatGrid rows={show.rows} rowGap={show.rowGap} />
        </ZoomableLayout>
      </div>

      <div className="mt-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Selected: {selectedList.length}
            </p>
            <p className="text-xs text-gray-500">
              {selectedList.map((s) => `${s.row}${s.number}`).join(", ") || "—"}
            </p>
          </div>

          <button
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-40"
            disabled={selectedList.length === 0}
            onClick={() => {
              // call your booking API
              // payload: seatIds: selectedList.map(s => s.seatId)
              console.log("Book seats:", selectedList);
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
