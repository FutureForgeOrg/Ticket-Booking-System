import SeatBadge from "./SeatBadge";

const ScreenSeatLayout = ({ screen }) => {
    const rows = screen.seats.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    return (
        <div className="border rounded p-4 space-y-3">
            <h4 className="font-semibold">{screen.name}</h4>

            {Object.keys(rows).map((row) => (
                <div key={row} className="flex gap-2 items-center">
                    <span className="w-6">{row}</span>
                    <div className="flex gap-2 flex-wrap">
                        {rows[row]
                            .sort((a, b) => a.number - b.number)
                            .map(seat => (
                                <SeatBadge
                                    key={`${seat.row}-${seat.number}`}
                                    seat={seat}
                                />
                            ))}

                    </div>
                </div>
            ))}

            <div className="text-center text-xs text-muted-foreground mt-3">
                ─── SCREEN ───
            </div>
        </div>
    );
};

export default ScreenSeatLayout;
