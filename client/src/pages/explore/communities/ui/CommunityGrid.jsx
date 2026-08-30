import React from "react";
import { Compass, AlertCircle } from "lucide-react";
import { CommunityCard } from "./CommunityCard";
import { cn } from "@/shared/integrations/cn";

export function CommunityGrid({
  communities = [],
  isLoading,
  error,
  searchQuery,
  className,
}) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          className,
        )}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-app-lg bg-app-surface/20 border border-app-border animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-app-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>
          {error.message || "Failed to load communities. Please try again."}
        </span>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-app-border rounded-app-lg bg-app-surface/20">
        <Compass className="w-10 h-10 text-content-muted mb-3 stroke-[1.5]" />
        <h3 className="text-base font-semibold text-content-primary">
          No communities found
        </h3>
        <p className="text-xs text-content-secondary mt-1 max-w-xs">
          {searchQuery
            ? `No results matched "${searchQuery}". Try a different keyword.`
            : "There are no communities available right now."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {communities.map((community) => (
        <CommunityCard key={community._id} community={community} />
      ))}
    </div>
  );
}
