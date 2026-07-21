import { useState } from "react";
import { useCreateComment } from "../../hooks";

export function useCommentComposer({ postId, parent = null, onSuccess }) {
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
    content,
    loading: createComment.isPending,
    canSubmit,

    setContent,
    submit,
  };
}
