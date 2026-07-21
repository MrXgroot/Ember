import { create } from "zustand";

import { saveSession, getSession, clearSession } from "./storage";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,

  isAuthenticated: false,

  pendingAction: null,

  login({ user, token }) {
    saveSession({ user, token });

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout() {
    clearSession();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      pendingAction: null,
    });
  },

  restore() {
    const session = getSession();

    if (!session) {
      return;
    }

    set({
      user: session.user,
      token: session.token,
      isAuthenticated: true,
    });
  },

  setPendingAction(action) {
    set({
      pendingAction: action,
    });
  },

  completeAuthentication() {
    const { pendingAction } = get();

    set({
      pendingAction: null,
    });

    pendingAction?.();
  },
}));
