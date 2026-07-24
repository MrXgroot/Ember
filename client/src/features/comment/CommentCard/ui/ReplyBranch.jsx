import React from "react";
import { CornerDownRight } from "lucide-react";

import { CommentCard } from "../CommentCard";

export function ReplyBranch({ comment }) {
  return (
    <div className="relative w-full">
      <CornerDownRight className="absolute -left-4 top-3.5 h-3 w-3 text-content-muted/60 md:-left-6" />

      <CommentCard comment={comment} />
    </div>
  );
}
