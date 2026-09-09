import React from "react";
import { NavLink } from "react-router-dom";
import { MessageSquare, Share2 } from "lucide-react";
import { VoteControls } from "./VoteControls";

export function PostActions({
  postId,
  title,
  score,
  comments,
  currentVote,
  onUpvote,
  onDownvote,
}) {
  const postUrl = `${window.location.origin}/post/${postId}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        url: postUrl,
      });

      return;
    }

    await navigator.clipboard.writeText(postUrl);
  };

  return (
    <div className="flex items-center justify-between pt-2 border-t border-app-border/40 mt-1">
      <div className="flex items-center gap-2">
        <VoteControls
          score={score}
          currentVote={currentVote}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />

        <NavLink
          to={`/post/${postId}#comments`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-app-bg border border-app-border text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-surface transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-content-muted" />
          <span>{comments}</span>
        </NavLink>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-content-muted hover:text-content-primary hover:bg-app-surface transition-colors"
        title="Share"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Share</span>
      </button>
    </div>
  );
}
