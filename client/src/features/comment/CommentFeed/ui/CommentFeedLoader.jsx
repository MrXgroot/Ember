import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommentFeedLoader({ className }) {
  return (
    <div className={cn("flex flex-col gap-4 animate-pulse", className)}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="bg-app-surface border border-app-border/60 rounded-app-lg p-4 h-24 w-full flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-20 bg-zinc-700/50 rounded" />
            <div className="h-3 w-2 bg-zinc-700/50 rounded" />
            <div className="h-3 w-14 bg-zinc-700/50 rounded" />
          </div>
          <div className="h-4 w-5/6 bg-zinc-700/40 rounded" />
        </div>
      ))}
    </div>
  );
}
