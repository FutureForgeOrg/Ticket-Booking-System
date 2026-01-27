import SeatBadge from "./SeatBadge";

const SEAT_SIZE = 36;
const SEAT_GAP = 8;

const ScreenSeatLayout = ({ screen }) => {
  const { rows, rowGap } = screen.layout;

  return (
    <div className="border rounded p-4 bg-white">
      <h4 className="font-semibold mb-3">{screen.name}</h4>

      {rows.map((row) => {
        let seatNo = 1;

        return (
          <div key={row.row} className="flex items-center" style={{ marginBottom: rowGap }}>
            <span className="w-6 mr-2">{row.row}</span>

            <div className="flex">
              {row.blocks.map((block, i) =>
                block.gap ? (
                  <div key={i} style={{ width: block.count * (SEAT_SIZE + SEAT_GAP) }} />
                ) : (
                  Array.from({ length: block.count }).map((_, j) => (
                    <div key={j} style={{ marginRight: SEAT_GAP }}>
                      <SeatBadge
                        seat={{
                          row: row.row,
                          number: seatNo++,
                          type: block.seatType
                        }}
                      />
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        );
      })}

      <div className="text-center text-xs mt-4">----- SCREEN -----</div>
    </div>
  );
};

export default ScreenSeatLayout;
