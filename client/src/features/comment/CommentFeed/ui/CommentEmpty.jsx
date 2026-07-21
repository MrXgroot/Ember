import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommentEmptyState({ className }) {
  return (
    <div
      className={cn(
        "text-center py-12 px-4 border border-dashed border-app-border/80 rounded-app-lg",
        "text-sm font-medium text-content-muted bg-app-surface/30",
        className,
      )}
    >
      No comments yet. Start the conversation!
    </div>
  );
}
