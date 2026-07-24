import React from "react";
import { CornerDownRight } from "lucide-react";

import { CommentCard } from "../CommentCard";

export function ReplyList({ replies = [] }) {
  if (!replies.length) return null;

  return (
    <div className="ml-2 mt-1 flex flex-col gap-3 border-l border-app-border/60 pl-4 md:pl-6">
      {replies.map((reply) => (
        <div key={reply._id ?? reply.id} className="relative w-full">
          <CornerDownRight className="absolute -left-4 top-3.5 h-3 w-3 text-content-muted/60 md:-left-6" />

          <CommentCard comment={reply} />
        </div>
      ))}
    </div>
  );
}
