import React from "react";
import { MessageSquareOff } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommentEmpty({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 border border-dashed border-app-border/80 bg-app-surface/40 rounded-app-lg text-center gap-2",
        className,
      )}
    >
      <MessageSquareOff className="w-5 h-5 text-content-muted" />
      <p className="text-xs font-medium text-content-muted">
        No comments yet. Be the first to share your thoughts!
      </p>
    </div>
  );
}
