import { useMutation } from "@tanstack/react-query";

import { joinCommunity } from "../api";

export function useJoinCommunity() {
  return useMutation({
    mutationFn: joinCommunity,
  });
}
