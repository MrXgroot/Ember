import { useAuthStore } from "./store";
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const restore = useAuthStore((state) => state.restore);

  return {
    user,
    token,
    isAuthenticated,

    login,
    logout,
    restore,
  };
}
