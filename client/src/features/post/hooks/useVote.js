import { useMutation, useQueryClient } from "@tanstack/react-query";

import { votePost } from "../api/votePost";
import { postKeys } from "../queryKeys";

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, type }) => votePost(postId, type),

    async onMutate({ postId, type }) {
      await queryClient.cancelQueries({
        queryKey: postKeys.all,
      });

      const previousPosts = queryClient.getQueryData(postKeys.all);

      queryClient.setQueryData(postKeys.all, (posts = []) =>
        posts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            metrics: {
              ...post.metrics,
              score: (post.metrics?.score ?? 0) + (type === "upvote" ? 1 : -1),
            },
          };
        }),
      );

      return { previousPosts };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(postKeys.all, context.previousPosts);
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
    },
  });
}
