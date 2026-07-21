import { create } from "zustand";

export const useDrawerStore = create((set) => ({
  isOpen: false,

  open() {
    set({ isOpen: true });
  },

  close() {
    set({ isOpen: false });
  },

  toggle() {
    set((state) => ({
      isOpen: !state.isOpen,
    }));
  },
}));
