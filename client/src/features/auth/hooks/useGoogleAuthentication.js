import { useMutation } from "@tanstack/react-query";

import { googleLogin } from "../api";

export function useGoogleAuthentication() {
  return useMutation({
    mutationFn: googleLogin,
  });
}
