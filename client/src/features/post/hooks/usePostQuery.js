import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api";
import { postKeys } from "../queryKeys";

export function usePostsQuery(request = {}, queryOptions = {}) {
  return useQuery({
    queryKey: postKeys.list(request),

    queryFn: () => getPosts(request),

    ...queryOptions,
  });
}
