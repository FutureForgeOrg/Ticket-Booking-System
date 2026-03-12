import { create } from "zustand";
import type { User } from "../types/user.type";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  authInitialized: boolean;
  setAuthInitialized: (value: boolean) => void;
  pendingEmail: string | null;
  setPendingEmail: (email: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authInitialized: false,
  pendingEmail: null,

  setUser: (user) => set({ user }),
  setAuthInitialized: (value) => set({ authInitialized: value }),
  setPendingEmail: (email) => set({ pendingEmail: email }),
}));
