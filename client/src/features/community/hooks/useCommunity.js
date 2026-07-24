import { useQuery } from "@tanstack/react-query";

import { getCommunity } from "../api";
import { communityKeys } from "../queryKeys";

export function useCommunity({ slug }) {
  return useQuery({
    queryKey: communityKeys.detail(slug),
    queryFn: () => getCommunity({ slug }),
    enabled: !!slug,
  });
}
