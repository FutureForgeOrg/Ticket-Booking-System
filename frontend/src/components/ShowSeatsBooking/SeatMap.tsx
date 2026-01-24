import { useMemo } from "react";
import { useSeatStore } from "../../store/seatStore";
import type { SeatType, ShowSeat } from "../../types/showById.type";
import { groupSeatsByRow } from "../../utils/seatRows";

function seatTypeBorder(type: SeatType): string {
  // subtle per-type hint
  if (type === "vip") return "border-primary/70";
  if (type === "premium") return "border-secondary/70";
  return "border-border";
}

export default function SeatMap({ seats }: { seats: ShowSeat[] }) {
  const rows = useMemo(() => groupSeatsByRow(seats), [seats]);
  const { selected, toggle } = useSeatStore();

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
      {/* Screen */}
      <div className="mb-4">
        <div className="mx-auto h-2 w-[72%] rounded-full bg-border/60" />
        <div className="mt-2 text-center text-[11px] tracking-[0.25em] text-text-muted">
          SCREEN THIS WAY
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-2 text-xs text-text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded border border-border bg-canvas" />{" "}
          Available
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded border border-primary/70 bg-primary-soft" />{" "}
          Selected
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded border border-border bg-border/60" />{" "}
          Booked
        </span>
      </div>

      {/* Scrollable canvas */}
      <div className="overflow-auto rounded-xl border border-border bg-canvas p-3">
        <div className="min-w-max space-y-2">
          {rows.map((r) => (
            <div key={r.row} className="flex items-center gap-2">
              <div className="w-6 text-xs font-semibold text-text-secondary">
                {r.row}
              </div>

              <div className="flex gap-2">
                {r.seats.map((s) => {
                  const isSelected = !!selected[s._id];

                  const base =
                    "h-8 w-8 rounded-md border text-[10px] font-semibold transition focus:outline-none focus:shadow-focus";

                  if (s.isBooked) {
                    return (
                      <button
                        key={s._id}
                        disabled
                        className={[
                          base,
                          "cursor-not-allowed border-border bg-border/60 text-text-muted opacity-70",
                        ].join(" ")}
                        title={`${s.row}${s.number} • Booked`}
                      >
                        {s.number}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={s._id}
                      onClick={() => toggle(s)}
                      className={[
                        base,
                        "bg-surface text-text-primary hover:border-primary/40",
                        isSelected
                          ? "border-primary bg-primary-soft"
                          : seatTypeBorder(s.type),
                      ].join(" ")}
                      title={`${s.row}${s.number} • ${s.type}`}
                    >
                      {s.number}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
