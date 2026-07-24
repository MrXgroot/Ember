import { useState } from "react";

import { useCreateComment } from "../../hooks";

export function useCommentComposerController({
  postId,
  parent = null,
  onSuccess,
}) {
  const [content, setContent] = useState("");

  const createComment = useCreateComment(postId);

  const canSubmit = content.trim().length > 0;

  const submit = async () => {
    if (!canSubmit) return;

    await createComment.mutateAsync({
      parent,
      content: content.trim(),
    });

    setContent("");

    onSuccess?.();
  };

  return {
    data: {
      content,
    },

    ui: {
      loading: createComment.isPending,
      canSubmit,
    },

    actions: {
      setContent,
      submit,
    },
  };
}
