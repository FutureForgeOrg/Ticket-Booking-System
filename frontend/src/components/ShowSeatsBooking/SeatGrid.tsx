import Seat from "./Seats";
import type { LayoutRow, SeatType } from "../../types/showById.type";

const SEAT_SIZE = 28;
const SEAT_GAP = 8;
const CELL_WIDTH = SEAT_SIZE + SEAT_GAP;

function Gap({ count }: { count: number }) {
  return <div style={{ width: count * CELL_WIDTH }} />;
}

function SeatTypeDivider({
  type,
  price,
}: {
  type: "vip" | "premium" | "regular";
  price: number;
}) {
  const labelMap = {
    vip: "Platinum",
    premium: "Gold",
    regular: "Silver",
  };

  return (
    <div className="my-6 flex-col justify-center items-center gap-4">
      <div className="text-sm text-center font-normal italic text-gray-200 whitespace-nowrap">
        ₹{price} {labelMap[type]}
      </div>
      <div className="h-[0.5px] flex-1 bg-gray-400" />  
    </div>
  );
}

export default function SeatGrid({
  rows,
  rowGap,
  price,
}: {
  rows: LayoutRow[];
  rowGap: number;
  price: Record<SeatType, number>;
}) {
  const renderedTypes = new Set<string>();
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-max p-4">  

        {/* Rows */}
        <div className="flex flex-col" style={{ gap: rowGap }}>
          {rows.map((row) => {
            const firstSeatBlock = row.blocks.find((b) => !b.gap);

            const seatType =
              firstSeatBlock && !firstSeatBlock.gap
                ? firstSeatBlock.seatType
                : undefined;

            const showDivider = seatType && !renderedTypes.has(seatType);

            if (showDivider) {
              renderedTypes.add(seatType);
            }

            return (
              <div key={row.row}>
                {/* Seat Type Divider */}
                {showDivider && (
                  <SeatTypeDivider type={seatType} price={price[seatType]} />
                )}

                {/* Actual Row */}
                <div className="flex items-center">
                  <div className="mr-3 w-5 text-sm font-medium text-gray-600">
                    {row.row}
                  </div>

                  <div className="flex items-center">
                    {row.blocks.map((block, blockIndex) => {
                      if (block.gap) {
                        return (
                          <Gap
                            key={`gap-${row.row}-${blockIndex}`}
                            count={block.count}
                          />
                        );
                      }

                      return (
                        <div
                          key={`block-${row.row}-${blockIndex}`}
                          className="flex items-center"
                        >
                          {block.seats.map((seat) => (
                            <div
                              key={seat.seatId}
                              style={{
                                width: CELL_WIDTH,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Seat {...seat} />
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Screen */}
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
