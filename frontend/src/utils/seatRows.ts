import type { ShowSeat } from "../types/showById.type";

export type SeatRow = { row: string; seats: ShowSeat[] };

export function groupSeatsByRow(seats: ShowSeat[]): SeatRow[] {
  const map = new Map<string, ShowSeat[]>();

  for (const s of seats) {
    // if (!map.has(s.row)) map.set(s.row, []);
    // map.get(s.row)!.push(s);
    const rowSeats = map.get(s.row) || [];
    rowSeats.push(s);
    map.set(s.row, rowSeats);

    // "A" : [...seats]
    // "B" : [...seats]
  }

  // sort rows alphabetically
  const rowKeys = Array.from(map.keys()).sort((a, b) => a.localeCompare(b));

  return rowKeys.map((row) => ({
    row,
    seats: map
      .get(row)!
      .slice()
      .sort((a, b) => a.number - b.number), // sort seats in the row by seat number
  }));
}
