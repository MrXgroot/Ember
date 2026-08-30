import { useAuthStore } from "../store";

export function getToken() {
  return useAuthStore.getState().token;
}
