import { usePostsQuery, useVote } from "../../hooks";

export function useFeed() {
  const query = usePostsQuery();
  const vote = useVote();
  return {
    data: {
      posts: query.data ?? [],
    },

    state: {
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      error: query.error,
    },

    actions: {
      refresh: query.refetch,
      upvote(postId) {
        vote.mutate({
          postId,
          type: "upvote",
        });
      },
      downvote(postId) {
        vote.mutate({
          postId,
          type: "downvote",
        });
      },
    },

    ui: {
      showLoader: query.isLoading,
      showEmpty:
        !query.isLoading && !query.isError && (query.data?.length ?? 0) === 0,

      showError: query.isError,
    },
  };
}
