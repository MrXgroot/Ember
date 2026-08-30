import { create } from "zustand";

import {
  saveAccount,
  getAccounts,
  getActiveAccount,
  saveActiveAccountId,
  removeAccount as removeStoredAccount,
  clearActiveAccount,
} from "../storage";

export const useAuthStore = create((set, get) => ({
  // Active session
  user: null,
  token: null,
  isAuthenticated: false,

  // Saved accounts
  accounts: [],
  activeAccountId: null,

  login({ user, token }) {
    const account = {
      id: user._id,
      user,
      token,
    };

    saveAccount(account);
    saveActiveAccountId(account.id);

    set({
      user,
      token,
      isAuthenticated: true,
      accounts: getAccounts(),
      activeAccountId: account.id,
    });
  },

  switchAccount(accountId) {
    const account = get().accounts.find((account) => account.id === accountId);

    if (!account) {
      return;
    }

    saveActiveAccountId(account.id);

    set({
      user: account.user,
      token: account.token,
      isAuthenticated: true,
      activeAccountId: account.id,
    });
    window.location.reload();
  },

  removeAccount(accountId) {
    removeStoredAccount(accountId);

    const accounts = getAccounts();
    const { activeAccountId } = get();

    if (activeAccountId === accountId) {
      clearActiveAccount();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        accounts,
        activeAccountId: null,
      });

      return;
    }

    set({ accounts });
  },

  logout() {
    clearActiveAccount();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      activeAccountId: null,
      pendingAction: null,
    });
  },

  restore() {
    const accounts = getAccounts();
    const account = getActiveAccount();

    if (!account) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        accounts,
        activeAccountId: null,
      });

      return;
    }

    set({
      user: account.user,
      token: account.token,
      isAuthenticated: true,
      accounts,
      activeAccountId: account.id,
    });
  },

  getToken() {
    return get().token;
  },
}));
