import React from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from "lucide-react";

export function PostActions({ post, onUpvote, onDownvote }) {
  const voteCount = post?.metrics?.score ?? 0;
  const commentCount = post?.commentsCount ?? post?.metrics?.comments ?? 0;

  return (
    <div className="flex items-center gap-3 mt-2 pt-4 border-t border-app-border/40">
      <div className="flex items-center bg-app-bg border border-app-border rounded-app-md p-1">
        <button
          onClick={onUpvote}
          className="p-1.5 rounded-full text-content-muted hover:text-brand-primary hover:bg-brand-light transition-colors"
          aria-label="Upvote"
        >
          <ArrowBigUp className="w-5 h-5 stroke-[2.5]" />
        </button>
        <span className="text-sm font-bold px-2 min-w-[24px] text-center text-content-primary">
          {voteCount}
        </span>
        <button
          onClick={onDownvote}
          className="p-1.5 rounded-full text-content-muted hover:text-red-400 hover:bg-red-950/30 transition-colors"
          aria-label="Downvote"
        >
          <ArrowBigDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex items-center gap-2 h-9 px-4 rounded-app-md text-sm font-medium bg-app-bg border border-app-border text-content-secondary">
        <MessageSquare className="w-4 h-4 text-content-muted" />
        <span>{commentCount} Comments</span>
      </div>

      <button
        className="flex items-center justify-center w-9 h-9 rounded-full transition-colors bg-app-bg border border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface"
        aria-label="Share post"
      >
        <Share2 className="w-4 h-4 text-content-muted" />
      </button>
    </div>
  );
}
