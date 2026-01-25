const generateLayout = ({ preset, rowGapOverride, rows }) => {
  return {
    rowGap: rowGapOverride ?? preset.rowGap,

    rows: rows.map(r => {
      const columnGap = r.columnGap ?? preset.columnGap;
      const startGap = r.startGap ?? preset.startGap;

      const count = Number(r.count) || 0; // prevent undefined
      const leftSeats = Math.floor(count / 2);
      const rightSeats = count - leftSeats;

      return {
        row: r.row ?? "",
        startGap,
        columnGap,   // include columnGap at row level for Mongoose
        blocks: [
          { count: leftSeats, seatType: r.seatType || preset.defaultSeatType },
          { gap: true, size: preset.aisleAfter },
          { count: rightSeats, seatType: r.seatType || preset.defaultSeatType }
        ]
      };
    })
  };
};

export default generateLayout;
