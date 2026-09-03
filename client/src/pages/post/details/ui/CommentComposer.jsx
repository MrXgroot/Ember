import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useAuth, useAuthGuard } from "@/app/auth";
import { useCreateComment } from "@/features/comment/hooks";

export function CommentComposer({ postId }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const auth = useAuthGuard();
  const createCommentMutation = useCreateComment(postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || createCommentMutation.isPending) return;

    auth.require(() => {
      createCommentMutation.mutate(
        { content: content.trim() },
        {
          onSuccess: () => {
            setContent("");
          },
        },
      );
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-app-lg bg-app-surface/30 border border-app-border p-4">
      <div className="text-xs text-content-muted">
        Comment as{" "}
        <span className="font-semibold text-content-primary">
          {user?.displayName || user?.username || "Guest"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full resize-none rounded-app-md bg-app-bg border border-app-border px-3 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-colors"
        />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={!content.trim() || createCommentMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-app-md bg-brand-primary text-app-bg text-xs font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {createCommentMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
