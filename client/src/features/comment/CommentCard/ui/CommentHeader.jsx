import React from "react";

export function CommentHeader({ author, timeAgo }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className="font-bold text-content-primary">u/{author}</span>

        <span className="text-content-muted">•</span>

        <span className="font-normal text-content-muted">{timeAgo}</span>
      </div>
    </div>
  );
}
