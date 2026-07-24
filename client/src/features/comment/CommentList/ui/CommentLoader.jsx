import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommentLoader({ count = 3, className }) {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 bg-app-surface/90 border border-app-border/60 rounded-app-lg flex flex-col gap-3 animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-20 bg-zinc-700/50 rounded" />
            <div className="h-3 w-1.5 bg-zinc-700/50 rounded-full" />
            <div className="h-3 w-12 bg-zinc-700/40 rounded" />
          </div>

          {/* Body Skeleton */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-full bg-zinc-700/40 rounded" />
            <div className="h-3.5 w-3/4 bg-zinc-700/40 rounded" />
          </div>

          {/* Action Strip Skeleton */}
          <div className="flex items-center gap-3 mt-1">
            <div className="h-6 w-16 bg-zinc-700/50 rounded-app-md" />
            <div className="h-6 w-12 bg-zinc-700/40 rounded-app-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
