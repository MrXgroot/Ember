import { useQuery } from "@tanstack/react-query";

import { getCommunities } from "../api";
import { communityKeys } from "../queryKeys";
export function useCommunities(request = {}, queryOptions = {}) {
  console.log("beign called");
  return useQuery({
    queryKey: communityKeys.list(request),
    queryFn: () => getCommunities(request),
    ...queryOptions,
  });
}
