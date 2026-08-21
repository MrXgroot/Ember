import { usePostsQuery } from "@/features/post/hooks";
import { useCommunities } from "@/features/community/hooks";
export function useSearch({ query = "", type = "all" } = {}) {
  const enabled = Boolean(query.trim());

  const postsQuery = usePostsQuery(
    {
      search: query,
    },
    {
      enabled: enabled && (type === "all" || type === "posts"),
    },
  );

  const communitiesQuery = useCommunities(
    {
      search: query,
    },
    {
      enabled: enabled && (type === "all" || type === "communities"),
    },
  );

  return {
    posts: postsQuery.data ?? [],
    communities: communitiesQuery.data ?? [],

    isPending: postsQuery.isPending || communitiesQuery.isPending,

    isError: postsQuery.isError || communitiesQuery.isError,

    refetch: () => {
      postsQuery.refetch();
      communitiesQuery.refetch();
    },
  };
}
