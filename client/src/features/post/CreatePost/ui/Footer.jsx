import React from "react";
import { cn } from "@/shared/integrations/cn";

export function Footer({ onCancel, onPublish, isPublishDisabled, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 pt-2 border-t border-app-border/40",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCancel}
        className={cn(
          "h-8 px-4 rounded-app-md text-xs font-medium transition-colors",
          "bg-transparent border border-transparent text-content-secondary hover:text-content-primary hover:bg-app-bg",
        )}
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={isPublishDisabled}
        onClick={onPublish}
        className={cn(
          "h-8 px-4 rounded-app-md text-xs font-semibold transition-all shadow-md active:scale-[0.98]",
          "bg-brand-primary text-white hover:bg-brand-hover disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
        )}
      >
        Post
      </button>
    </div>
  );
}
