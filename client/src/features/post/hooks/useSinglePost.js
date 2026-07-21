import { useQuery } from "@tanstack/react-query";

import { getPost } from "../api/getPost";
import { postKeys } from "../queryKeys";

export function usePost(postId) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
    enabled: Boolean(postId),
  });
}
