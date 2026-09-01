import React from "react";
import { HelpCircle, Loader2, Send } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CreatePostActions({
  onCancel,
  isPending,
  statusText = "Publishing...",
  disabled,
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-app-border/40 pt-4 mt-2",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-xs text-content-muted">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Make sure to follow community guidelines.</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-4 py-2 rounded-app-md text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-surface disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={disabled || isPending}
          className="flex items-center gap-2 px-5 py-2.5 rounded-app-md bg-brand-primary text-app-bg text-xs font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          ) : (
            <Send className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{isPending ? statusText : "Publish Post"}</span>
        </button>
      </div>
    </div>
  );
}
