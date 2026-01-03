export const generateSeats = (rows) => {
  return rows.flatMap(r =>
    Array.from({ length: Number(r.count) }, (_, i) => ({
      row: r.row,
      number: i + 1,
      type: r.type
    }))
  );
};
