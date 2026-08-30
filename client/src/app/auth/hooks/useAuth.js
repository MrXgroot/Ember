import { useAuthStore } from "../store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const accounts = useAuthStore((state) => state.accounts);

  const activeAccountId = useAuthStore((state) => state.activeAccountId);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const restore = useAuthStore((state) => state.restore);

  const switchAccount = useAuthStore((state) => state.switchAccount);

  const removeAccount = useAuthStore((state) => state.removeAccount);

  return {
    user,
    token,
    isAuthenticated,

    accounts,
    activeAccountId,

    login,
    logout,
    restore,
    switchAccount,
    removeAccount,
  };
}
