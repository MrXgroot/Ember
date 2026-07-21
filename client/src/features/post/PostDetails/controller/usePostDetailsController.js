import { usePost } from "../../hooks";
export function usePostDetailsController({ postId }) {
  const query = usePost(postId);

  function upvote() {}

  function downvote() {}

  return {
    data: {
      post: query.data,
    },

    ui: {
      isPending: query.isPending,
      isError: query.isError,
    },

    actions: {
      upvote,
      downvote,
    },
  };
}
