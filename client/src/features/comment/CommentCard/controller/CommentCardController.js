import { useState } from "react";

import { useCommentComposerController } from "../../CommentComposer";

export function useCommentController({ postId, comment }) {
  const [showReplyComposer, setShowReplyComposer] = useState(false);

  const reply = useCommentComposerController({
    postId,
    parent: comment._id,
  });

  const replies = comment.children ?? comment.replies ?? [];

  return {
    data: {
      comment,
      author:
        comment.user?.username ?? comment.user?.displayName ?? "anonymous",
      body: comment.body ?? comment.content ?? "",
      score: comment.metrics?.score ?? 0,
      timeAgo: comment.createdAt ?? "Just now",
      replies,
    },

    ui: {
      showReplyComposer,
    },

    actions: {
      toggleReplyComposer: () => setShowReplyComposer((prev) => !prev),

      closeReplyComposer: () => setShowReplyComposer(false),
    },

    reply,
  };
}
