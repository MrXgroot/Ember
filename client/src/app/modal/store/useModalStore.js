import { create } from "zustand";

export const useModalStore = create((set) => ({
  modal: null,
  props: {},

  open(modal, props = {}) {
    console.log("modal clicking");
    set({
      modal,
      props,
    });
  },

  close() {
    set({
      modal: null,
      props: {},
    });
  },
}));
