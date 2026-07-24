import { useComments } from "../../hooks";

export function useCommentListController({ postId }) {
  const query = useComments(postId);

  const comments = query.data?.comments ?? [];

  return {
    data: {
      comments,
      postId,
    },

    ui: {
      isPending: query.isPending,
      isError: query.isError,
      isEmpty: !query.isPending && comments.length === 0,
    },

    actions: {
      refetch: query.refetch,
    },
  };
}
