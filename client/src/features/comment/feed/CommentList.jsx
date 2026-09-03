import React from "react";
import { MessageSquare, Loader2, AlertCircle } from "lucide-react";

import { useComments, useCreateComment } from "../hooks";
import { useAuthGuard } from "@/app/auth";
import { CommentItem } from "./ui/CommentItem";
import { CommentEmptyState } from "./ui/CommentEmptyState";

export function CommentList({ postId, className }) {
  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useComments(postId);
  console.log(comments);
  const auth = useAuthGuard();
  const createCommentMutation = useCreateComment(postId);

  const handleReply = ({ parentId, content, onSuccess }) => {
    auth.require(() => {
      createCommentMutation.mutate(
        {
          content,
          parent: parentId,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    });
  };

  if (isLoading) {
    return (
      <section className={`flex flex-col gap-4 ${className || ""}`}>
        <CommentHeader count={0} />
        <div className="flex items-center justify-center py-10 text-content-muted">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`flex flex-col gap-4 ${className || ""}`}>
        <CommentHeader count={0} />
        <div className="flex items-center gap-2 p-4 rounded-app-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error?.message || "Failed to load comments."}</span>
        </div>
      </section>
    );
  }

  return (
    <section className={`flex flex-col gap-4 ${className || ""}`}>
      <CommentHeader count={comments.length} />

      {comments.length === 0 ? (
        <CommentEmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              isSubmittingReply={createCommentMutation.isPending}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CommentHeader({ count }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-app-border/60">
      <div className="flex items-center gap-2 text-sm font-semibold text-content-primary">
        <MessageSquare className="w-4 h-4 text-content-muted" />
        <span>Comments</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-app-surface text-content-secondary font-medium">
          {count}
        </span>
      </div>
    </div>
  );
}
