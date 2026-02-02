import { create } from "zustand";
import type { User } from "../types/user.type";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  authInitialized: boolean;
  setAuthInitialized: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authInitialized: false,

  setUser: (user) => set({ user }),
  setAuthInitialized: (value) => set({ authInitialized: value }),
}));
