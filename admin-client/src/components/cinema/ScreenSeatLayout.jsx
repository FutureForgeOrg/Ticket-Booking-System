import SeatBadge from "./SeatBadge";

const ScreenSeatLayout = ({ screen }) => {
  const { rows, rowGap } = screen.layout; 

  return (
    <div className="border rounded p-4 bg-white">
      <h4 className="font-semibold mb-3">{screen.name}</h4>

      <div>
        {rows.map((row) => {
          let seatNumber = 1;

          const startGap = row.startGap ?? 0;        //  per row
          const columnGap = row.columnGap ?? 12;     //  per row (safe fallback)

          return (
            <div
              key={row.row}
              className="flex items-center"
              style={{ marginBottom: `${rowGap}px` }} //  per screen
            >
              {/* Row Label */}
              <span className="w-6 font-medium mr-2">{row.row}</span>

              {/* Seats Row */}
              <div
                className="flex items-center flex-nowrap"
                style={{ marginLeft: `${startGap}px` }}
              >
                {row.blocks.map((block, blockIdx) => {
                  // AISLE / GAP
                  if (block.gap) {
                    return (
                      <div
                        key={`gap-${blockIdx}`}
                        style={{
                          width: `${block.size}px`,
                          height: "36px"
                        }}
                      />
                    );
                  }

                  // SEATS
                  return Array.from({ length: block.count }).map((_, i) => {
                    const currentSeatNumber = seatNumber++;

                    return (
                      <div
                        key={`${row.row}-${currentSeatNumber}`}
                        style={{ marginRight: `${columnGap}px` }}
                      >
                        <SeatBadge
                          seat={{
                            row: row.row,
                            number: currentSeatNumber,
                            type: block.seatType || "regular"
                          }}
                        />
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* SCREEN LABEL */}
      <div className="text-center text-xs text-muted-foreground mt-4">
        ----- SCREEN -----
      </div>
    </div>
  );
};

export default ScreenSeatLayout;




