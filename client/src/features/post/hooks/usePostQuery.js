import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api";
import { postKeys } from "../queryKeys";

export function usePostsQuery(filters = {}, options = {}, config = {}) {
  return useQuery({
    queryKey: postKeys.list(filters, options),

    queryFn: () => getPosts(filters, options),

    ...config,
  });
}
