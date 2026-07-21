import { useComments } from "../../hooks";

export function useCommentListController({ postId }) {
  const query = useComments(postId);
  console.log(query);
  return {
    data: {
      comments: query.data?.comments ?? [],
    },

    ui: {
      isPending: query.isPending,
      isError: query.isError,
      isEmpty: !query.isPending && (query.data?.length ?? 0) === 0,
    },

    actions: {
      refetch: query.refetch,
    },
  };
}
