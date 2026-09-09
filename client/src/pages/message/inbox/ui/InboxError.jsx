import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function InboxError({ onRetry, className }) {
  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center text-center p-6 bg-app-surface border border-red-950/20 rounded-app-lg",
        className,
      )}
    >
      <AlertCircle className="w-8 h-8 text-red-400 mb-3" />

      <h3 className="text-sm font-semibold text-content-primary">
        Failed to load inbox
      </h3>

      <p className="text-xs text-content-secondary mt-1 max-w-sm mb-4">
        Could not sync conversations from the messaging server.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 px-4 h-8 rounded-app-md text-xs font-semibold bg-app-bg border border-app-border text-content-primary hover:bg-app-surface transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5 text-brand-primary" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
