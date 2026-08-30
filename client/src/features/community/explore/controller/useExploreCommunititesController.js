import { useMemo, useState } from "react";
import { useCommunities } from "@/features/community/hooks";

export function useExploreCommunitiesController() {
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Build request
  const request = useMemo(
    () => ({
      filters: {
        search: searchQuery || undefined,
      },
      options: {
        page,
        limit: 20,
        sort: filter,
      },
    }),
    [searchQuery, filter, page],
  );

  // Server State
  const { data: communities } = useCommunities(request);
  console.log(communities);
  return {
    communities,

    state: {
      searchQuery,
      filter,
      page,
    },

    actions: {
      setSearchQuery,
      setFilter,
      setPage,
    },
  };
}
