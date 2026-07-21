import { useQuery } from "@tanstack/react-query";

import { getComments } from "../api";
import { commentKeys } from "../queryKeys";

export function useComments(postId) {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => getComments(postId),
    enabled: Boolean(postId),
  });
}
