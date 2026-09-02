import { useMutation, useQueryClient } from "@tanstack/react-query";

import { votePost } from "../api/votePost";
import { postKeys } from "../queryKeys";

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, type }) => votePost(postId, type),

    async onMutate({ postId, type }) {
      // Stop an active posts request from overwriting
      // our optimistic update.
      await queryClient.cancelQueries({
        queryKey: postKeys.lists(),
      });

      // Save every cached post list for rollback.
      const previousQueries = queryClient.getQueriesData({
        queryKey: postKeys.lists(),
      });

      const newVote = type === "upvote" ? 1 : -1;

      // Optimistically update every cached post list.
      queryClient.setQueriesData(
        {
          queryKey: postKeys.lists(),
        },
        (posts) => {
          if (!posts) return posts;

          return posts.map((post) => {
            if (post._id !== postId) {
              return post;
            }

            const currentVote = post.viewer?.vote ?? null;

            let scoreChange;
            let vote;

            // Same vote clicked again → remove vote
            if (currentVote === newVote) {
              scoreChange = -newVote;
              vote = null;
            }

            // Changing upvote ↔ downvote
            else if (currentVote !== null) {
              scoreChange = newVote * 2;
              vote = newVote;
            }

            // First vote
            else {
              scoreChange = newVote;
              vote = newVote;
            }

            return {
              ...post,

              metrics: {
                ...post.metrics,
                score: (post.metrics?.score ?? 0) + scoreChange,
              },

              viewer: {
                ...post.viewer,
                vote,
              },
            };
          });
        },
      );

      return {
        previousQueries,
      };
    },

    onError(error, variables, context) {
      // Roll back every affected query.
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled() {
      // Get the real server state.
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(),
      });
    },
  });
}
