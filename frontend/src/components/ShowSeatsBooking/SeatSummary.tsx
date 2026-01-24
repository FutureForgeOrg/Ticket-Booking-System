import { useMemo } from "react";
import { useSeatStore } from "../../store/seatStore";
import type { ShowPrice } from "../../types/showListing.type";
import type { SeatType } from "../../types/showById.type";

export default function SeatSummary({ price }: { price: ShowPrice }) {
  const { selected, clear } = useSeatStore();
  const seats = Object.values(selected);

  const total = useMemo(() => {
    return seats.reduce((sum, s) => sum + (price[s.type as SeatType] ?? 0), 0);
  }, [seats, price]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-text-primary">
            Selected seats ({seats.length})
          </div>
          <div className="mt-1 text-xs text-text-muted">
            {seats.length
              ? seats.map((s) => `${s.row}${s.number}`).join(", ")
              : "None"}
          </div>
        </div>

        <button
          onClick={clear}
          className="rounded-xl border border-border bg-canvas px-3 py-1 text-xs text-text-secondary hover:border-primary/40"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 space-y-2 text-xs text-text-muted">
        <div className="flex items-center justify-between">
          <span>Regular</span>
          <span className="text-text-secondary">₹{price.regular}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Premium</span>
          <span className="text-text-secondary">₹{price.premium}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>VIP</span>
          <span className="text-text-secondary">₹{price.vip}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-text-muted">Total</div>
        <div className="text-lg font-bold text-text-primary">₹{total}</div>
      </div>

      <button
        disabled={!seats.length}
        className={[
          "mt-3 w-full rounded-xl px-4 py-2 text-sm font-semibold transition",
          seats.length
            ? "bg-primary text-canvas hover:bg-primary-hover"
            : "cursor-not-allowed bg-border text-text-muted",
        ].join(" ")}
      >
        Proceed
      </button>
    </div>
  );
}
