import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommunityPagination({
  currentPage,
  onPageChange,
  isLastPage,
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-app-border/40 pt-4 mt-2",
        className,
      )}
    >
      <span className="text-xs text-content-muted">
        Page <strong className="text-content-primary">{currentPage}</strong>
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="p-1.5 rounded-app-md bg-app-surface/50 border border-app-border text-content-secondary hover:text-content-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-app-md bg-app-surface/50 border border-app-border text-content-secondary hover:text-content-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
