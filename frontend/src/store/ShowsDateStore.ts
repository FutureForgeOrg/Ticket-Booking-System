import { create } from "zustand";
import { makeNextDaysTabs } from "../utils/showsDateHelper";

export type Tab = { key: string; dow: string; day: string; mon: string };

type State = {
  tabs: Tab[];
  selectedDayKey: string; // "YYYY-MM-DD" local
  setSelectedDayKey: (k: string) => void;
};

export const useShowDateStore = create<State>((set) => {
  const tabs = makeNextDaysTabs(6); // today + next 5
  return {
    tabs,
    selectedDayKey: tabs[0].key,
    setSelectedDayKey: (k) => set({ selectedDayKey: k }),
  };
});
