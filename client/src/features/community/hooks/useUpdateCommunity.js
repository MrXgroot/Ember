import { useMutation } from "@tanstack/react-query";

import { updateCommunity } from "../api";

export function useUpdateCommunity() {
  return useMutation({
    mutationFn: updateCommunity,
  });
}
