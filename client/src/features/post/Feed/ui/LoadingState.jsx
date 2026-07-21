import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function LoadingSkeletonCard() {
  return (
    <div
      className={cn(
        // Matches the exact padding, borders, and radius profile of your live PostCard
        "p-4 flex flex-col gap-3 bg-app-surface border border-app-border rounded-app-lg animate-pulse select-none",
      )}
    >
      {/* Meta Header Skeleton Track */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mock Community Tag Circle + Capsule */}
          <div className="w-5 h-5 rounded-full bg-app-bg border border-app-border" />
          <div className="h-3 w-20 bg-app-bg rounded-app-md" />
          <div className="h-3 w-24 bg-app-bg/60 rounded-app-md" />
        </div>
        <div className="w-6 h-6 rounded-full bg-app-bg/40" />
      </div>

      {/* Content Skeleton Lines */}
      <div className="flex flex-col gap-2 my-1">
        <div className="h-4 w-3/4 bg-app-bg rounded-app-md" />
        <div className="h-3 w-full bg-app-bg/60 rounded-app-md" />
        <div className="h-3 w-5/6 bg-app-bg/60 rounded-app-md" />
      </div>

      {/* Action Footer Capsule Tray Skeleton */}
      <div className="flex items-center gap-2 mt-1">
        {/* Mock Voting Block */}
        <div className="h-8 w-20 bg-app-bg border border-app-border rounded-app-md" />
        {/* Mock Comment Block */}
        <div className="h-8 w-28 bg-app-bg border border-app-border rounded-app-md" />
        {/* Mock Share Block */}
        <div className="w-8 h-8 rounded-full bg-app-bg border border-app-border" />
      </div>
    </div>
  );
}

export function LoadingState({ count = 3, className }) {
  // Generate an array of skeletons based on the requested count multiplier
  const skeletonItems = Array.from({ length: count });

  return (
    <div className={cn("flex flex-col gap-3.5 w-full relative", className)}>
      {/* Subtle overlay loading anchor in case you want to lock context screens */}
      <div className="absolute top-0 right-2 flex items-center gap-2 px-3 py-1 bg-app-surface/80 border border-app-border rounded-app-md backdrop-blur-sm shadow-surface-sm">
        <Loader2 className="w-3 h-3 text-brand-primary animate-spin stroke-[2.5]" />
        <span className="text-[10px] font-semibold tracking-wider text-content-secondary uppercase">
          Syncing
        </span>
      </div>

      {/* Render the skeleton layout chain natively into your feed grid block */}
      {skeletonItems.map((_, index) => (
        <LoadingSkeletonCard key={index} />
      ))}
    </div>
  );
}
