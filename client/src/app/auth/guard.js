import { useModal } from "@/app/modal";
import { useAuth } from "./hooks";

export function useAuthGuard() {
  const modal = useModal();
  const auth = useAuth();

  function require(action) {
    if (auth.isAuthenticated) {
      action();
      return;
    }
    modal.open("auth");
  }

  return {
    require,
  };
}
