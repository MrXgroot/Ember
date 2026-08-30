import { useModal } from "@/app/modal";
import { useAuth } from "./useAuth";

export function useAuthGuard() {
  const modal = useModal();
  const { isAuthenticated } = useAuth();

  function require(action) {
    if (isAuthenticated) {
      action();
      return;
    }

    modal.open("auth");
  }

  return {
    require,
  };
}
