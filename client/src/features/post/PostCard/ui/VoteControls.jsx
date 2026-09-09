import React from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function VoteControls({ score, currentVote, onUpvote, onDownvote }) {
  return (
    <div className="flex items-center bg-app-bg border border-app-border rounded-full p-0.5">
      <button
        type="button"
        onClick={onUpvote}
        className={cn(
          "p-1.5 rounded-full transition-colors",
          currentVote === 1
            ? "text-orange-500 bg-orange-500/10"
            : "text-content-muted hover:text-orange-500 hover:bg-orange-500/10",
        )}
        aria-label="Upvote"
      >
        <ArrowBigUp
          className={cn("w-4 h-4", currentVote === 1 && "fill-current")}
        />
      </button>

      <span
        className={cn(
          "px-1.5 text-xs font-semibold tabular-nums min-w-[1.75rem] text-center",
          score > 0 && "text-orange-500",
          score < 0 && "text-blue-500",
          score === 0 && "text-content-secondary",
        )}
      >
        {score}
      </span>

      <button
        type="button"
        onClick={onDownvote}
        className={cn(
          "p-1.5 rounded-full transition-colors",
          currentVote === -1
            ? "text-blue-500 bg-blue-500/10"
            : "text-content-muted hover:text-blue-500 hover:bg-blue-500/10",
        )}
        aria-label="Downvote"
      >
        <ArrowBigDown
          className={cn("w-4 h-4", currentVote === -1 && "fill-current")}
        />
      </button>
    </div>
  );
}
