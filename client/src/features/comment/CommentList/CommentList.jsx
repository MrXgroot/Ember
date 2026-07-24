import React from "react";
import { cn } from "@/shared/integrations/cn";

import { CommentCard } from "../CommentCard";
import { CommentLoader, CommentEmpty, CommentError } from "./ui";
export function CommentList({ controller, className }) {
  const { data, ui, refetch } = controller ?? {};

  if (ui?.isPending) {
    return <CommentLoader className={className} />;
  }

  if (ui?.isError) {
    return <CommentError onRetry={refetch} className={className} />;
  }

  if (ui?.isEmpty || !data?.comments?.length) {
    return <CommentEmpty className={className} />;
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {data.comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} postId={data.postId} />
      ))}
    </div>
  );
}
