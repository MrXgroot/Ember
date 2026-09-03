import { useMutation, useQueryClient } from "@tanstack/react-query";

import { votePost } from "../api/votePost";
import { postKeys } from "../queryKeys";

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, type }) => votePost(postId, type),

    async onMutate({ postId, type }) {
      // Cancel any active post requests
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: postKeys.lists(),
        }),

        queryClient.cancelQueries({
          queryKey: postKeys.detail(postId),
        }),
      ]);

      // Save previous list queries
      const previousLists = queryClient.getQueriesData({
        queryKey: postKeys.lists(),
      });

      // Save previous detail query
      const previousDetail = queryClient.getQueryData(postKeys.detail(postId));

      const newVote = type === "upvote" ? 1 : -1;

      const updatePost = (post) => {
        if (!post || post._id !== postId) {
          return post;
        }

        const currentVote = post.viewer?.vote ?? null;

        let scoreChange;
        let vote;

        // Clicking the same vote removes it
        if (currentVote === newVote) {
          scoreChange = -newVote;
          vote = null;
        }

        // Changing vote
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
      };

      // Update every Feed/list cache
      queryClient.setQueriesData(
        {
          queryKey: postKeys.lists(),
        },
        (posts) => {
          if (!posts) return posts;

          return posts.map(updatePost);
        },
      );

      // Update PostPage/detail cache
      queryClient.setQueryData(postKeys.detail(postId), updatePost);

      return {
        previousLists,
        previousDetail,
      };
    },

    onError(error, variables, context) {
      // Rollback lists
      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      // Rollback detail
      if (context?.previousDetail) {
        queryClient.setQueryData(
          postKeys.detail(variables.postId),
          context.previousDetail,
        );
      }
    },

    onSettled(_data, _error, variables) {
      // Refetch the affected list queries
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(),
      });

      // Refetch the affected detail query
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(variables.postId),
      });
    },
  });
}
