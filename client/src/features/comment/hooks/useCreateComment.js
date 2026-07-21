import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "../api";
import { commentKeys } from "../queryKeys";

export function useCreateComment(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createComment(postId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(postId),
      });
    },
  });
}
