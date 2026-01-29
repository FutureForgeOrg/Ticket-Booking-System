import { create } from "zustand";
import type { SeatType } from "../types/showById.type";

type SelectedSeat = {
  seatId: string;
  row: string;
  number: number;
  type: SeatType;
};

type SeatState = {
  selected: Record<string, SelectedSeat>;       // key = seat._id  // {seatId : {...seat data}}
  toggleSeat: (seat: SelectedSeat) => void;
  clear: () => void;
};

export const useSeatStore = create<SeatState>((set) => ({
  selected: {},
  toggleSeat: (seat) =>
    set((s) => {
      const next = { ...s.selected };
      if (next[seat.seatId]) delete next[seat.seatId];
      else next[seat.seatId] = seat;
      return { selected: next };
    }),
  clear: () => set({ selected: {} }),
}));
