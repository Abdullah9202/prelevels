import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimeState {
  time: number | null;
  setTime: (time: number | null) => void;
}

export const useTime = create<
  TimeState,
  [["zustand/persist", Partial<TimeState>]]
>(
  persist(
    (set) => ({
      time: null,
      setTime: (time: number | null) => set({ time }),
    }),
    {
      name: "time-storage",
      partialize: (state: TimeState) => ({ time: state.time }),
    }
  )
);
