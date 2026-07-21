import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommentCard({ comment, className }) {
  const author =
    comment?.user?.username ?? comment?.user?.displayName ?? "anonymous";
  const body = comment?.body ?? "";

  return (
    <div
      className={cn(
        "bg-app-surface border border-app-border/60 rounded-app-lg p-4 md:p-5",
        "flex flex-col gap-2.5 transition-all duration-150 hover:border-zinc-700/50",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-content-primary">u/{author}</span>
        <span className="text-content-muted">•</span>
        <span className="text-content-muted">just now</span>
      </div>

      <p className="text-sm font-normal text-content-secondary leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}
