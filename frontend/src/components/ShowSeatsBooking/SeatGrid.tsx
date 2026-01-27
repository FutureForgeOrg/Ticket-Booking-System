import type { SeatCell, SeatRow } from "../../types/showById.type";
import Seat from "./Seats";

function getGapWidthPx({
  isFirst,
  isBetweenSeats,
}: {
  isFirst: boolean;
  isBetweenSeats: boolean;
}) {
  if (isFirst) return 40;        // left padding
  if (isBetweenSeats) return 10; // seat spacing
  return 20;                    // fallback / aisle
}


export default function SeatGrid({
  rows,
  rowGap,
}: {
  rows: SeatRow[];
  rowGap: number;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-max p-4">
        {/* Screen indicator */}
        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4 text-xs text-gray-600">
          <LegendDot label="Available" className="border-gray-400" />
          <LegendDot
            label="Selected"
            className="bg-green-600 border-green-700"
          />
          <LegendDot
            label="Booked"
            className="bg-gray-200 border-gray-300 opacity-60"
          />
          <LegendDot label="Premium" className="border-yellow-500" />
          <LegendDot label="VIP" className="border-purple-500" />
        </div>

        <div className="flex flex-col" style={{ gap: rowGap }}>
          {rows.map((row) => (
            <div key={row.row} className="flex items-center">
              {/* Row label */}
              <div className="mr-3 w-5 text-sm text-gray-600">{row.row}</div>

              {/* Seats */}
              <div className="flex items-center">
                {row.cells.map((cell: SeatCell, index) => {
                  if (cell.kind === "gap") {
                    const prev = row.cells[index - 1];
                    const next = row.cells[index + 1];

                    const width = getGapWidthPx({
                      isFirst: index === 0,
                      isBetweenSeats:
                        prev?.kind === "seat" && next?.kind === "seat",
                    });

                    return <div key={`gap-${index}`} style={{ width }} />;
                  }

                  return (
                    <Seat
                      key={cell.seatId}
                      seatId={cell.seatId}
                      row={cell.row}
                      number={cell.number}
                      type={cell.type}
                      isBooked={cell.isBooked}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Screen preview */}
        <div className="my-10 flex justify-center">
          <img
            className="w-52 opacity-40"
            src="https://cdn.district.in/movies-web/_next/static/media/screen-img-light.b7b18ffd.png"
            alt="screen preview"
          />
        </div>
      </div>
    </div>
  );
}

function LegendDot({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded-sm border ${className}`} />
      <span>{label}</span>
    </div>
  );
}
