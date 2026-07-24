import { useMutation } from "@tanstack/react-query";

import { createCommunity } from "../api";

export function useCreateCommunity() {
  return useMutation({
    mutationFn: createCommunity,
  });
}
