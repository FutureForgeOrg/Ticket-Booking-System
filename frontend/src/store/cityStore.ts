import { create } from "zustand";

interface CityState {
  city: string;
  setCity: (city: string) => void;
}

export const useCityStore = create<CityState>((set) => ({
  city: "Mumbai",
  setCity: (city) => set({ city }),
}));
