import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../api/createPost";
import { postKeys } from "../queryKeys";
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
    },
  });
}
