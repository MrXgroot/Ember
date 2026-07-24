import React from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

export function CommentActions({ score, onReply, onUpvote, onDownvote }) {
  return (
    <div className="mt-1 flex items-center gap-3 text-xs text-content-muted">
      <div className="flex items-center rounded-app-md border border-app-border/80 bg-app-bg p-0.5">
        <button
          onClick={onUpvote}
          className="rounded p-1 transition-colors hover:text-brand-primary"
        >
          <ArrowBigUp className="h-3.5 w-3.5" />
        </button>

        <span className="min-w-[14px] px-1 text-center text-[11px] font-bold text-content-primary">
          {score}
        </span>

        <button
          onClick={onDownvote}
          className="rounded p-1 transition-colors hover:text-red-400"
        >
          <ArrowBigDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        onClick={onReply}
        className="flex items-center gap-1 rounded-app-sm px-2 py-1 text-xs font-medium transition-colors hover:bg-app-bg hover:text-content-primary"
      >
        Reply
      </button>
    </div>
  );
}
