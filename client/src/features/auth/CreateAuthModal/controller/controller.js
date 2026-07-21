import { useModal } from "@/app/modal";
import { useGoogleAuthentication } from "../../hooks";
import { useAuth } from "@/app/auth";
export function useCreateAuthModalController() {
  const modal = useModal();
  const login = useGoogleAuthentication();
  const auth = useAuth();
  async function continueWithGoogle(credential) {
    console.log(credential);
    try {
      const data = await login.mutateAsync(credential);
      console.log(data);
      auth.login(data);
      modal.close();
    } catch (error) {
      console.error(error);
    }
  }

  function close() {
    modal.close();
  }

  return {
    state: {},

    data: {},

    ui: {
      isPending: login.isPending,
    },

    actions: {
      close,
      continueWithGoogle,
    },
  };
}
