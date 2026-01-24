import { create } from "zustand";
import type { ShowSeat } from "../types/showById.type";

type State = {
  selected: Record<string, ShowSeat>; // key = seat._id  // {seatId : {...seat data}}
  toggle: (seat: ShowSeat) => void;
  clear: () => void;
};

export const useSeatStore = create<State>((set, get) => ({
  selected: {},

  toggle: (seat: ShowSeat) => {
    if (seat.isBooked) return; // cannot select already booked seat

    const currSelectedSeats = get().selected;

    if (currSelectedSeats[seat._id]) {
      // seat is already selected, unselect it
      const copy = { ...currSelectedSeats };
      delete copy[seat._id];
      set({ selected: copy });
    } else {
      // seat is not selected, select it
      set({
        selected: {
          ...currSelectedSeats,
          [seat._id]: seat,
        },
      });
    }
  },

  clear: () => {
    set({ selected: {} });
  },
}));
