import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
};

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: getInitialTheme(),

  setTheme: (isDark) => {
    set({ isDark });
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },

  toggleTheme: () => {
    const current = get().isDark;
    get().setTheme(!current);
  },
}));