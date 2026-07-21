import React from "react";
import { cn } from "@/shared/integrations/cn";
import { CommentCard } from "../CommentCard";

export function CommentList({ controller, className }) {
  let { comments = [] } = controller.data;
  console.log(comments.comments);
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {comments.map((comment) => (
        <CommentCard key={comment._id ?? comment.id} comment={comment} />
      ))}
    </div>
  );
}
