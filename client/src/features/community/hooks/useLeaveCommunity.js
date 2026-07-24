import { useMutation } from "@tanstack/react-query";

import { leaveCommunity } from "../api";

export function useLeaveCommunity() {
  return useMutation({
    mutationFn: leaveCommunity,
  });
}
