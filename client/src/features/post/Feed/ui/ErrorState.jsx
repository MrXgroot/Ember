import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function ErrorState({ error, onRetry, className }) {
  // Extract a clean error string safely while hiding complex code stack traces
  const errorMessage =
    error?.message ?? error ?? "An unexpected error occurred.";

  return (
    <div
      className={cn(
        // 1. Structure: Padded, centered containment layer matching our large capsule curvature
        "w-full py-16 px-4 flex flex-col items-center justify-center text-center",
        // 2. Token Skin: Soft error-themed low-opacity tint canvas surface block
        "bg-app-surface border border-red-950/20 rounded-app-lg shadow-surface-sm",
        className,
      )}
    >
      {/* Dynamic Alert Marker: Muted crimson/red accent system bounds */}
      <div className="w-12 h-12 rounded-full bg-red-950/30 text-red-400 flex items-center justify-center mb-4 border border-red-900/20">
        <AlertCircle className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Typography Hierarchy Tracking */}
      <div className="flex flex-col gap-1 max-w-sm mb-6">
        <h3 className="text-base font-semibold tracking-wide text-content-primary">
          Failed to load content
        </h3>
        <p className="text-xs text-content-secondary leading-relaxed tracking-wide font-mono bg-app-bg/60 py-1.5 px-3 rounded-app-sm border border-app-border/40 text-left line-clamp-2 mt-1 select-all">
          {errorMessage}
        </p>
      </div>

      {/* Action Recovery Hook: Capsule-aligned interaction button conditional render */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "flex items-center gap-2 h-9 px-4 rounded-app-md text-xs font-semibold tracking-wide transition-all duration-150 shadow-surface-sm",
            "bg-app-surface border border-app-border text-content-primary hover:bg-app-bg active:scale-95",
          )}
        >
          <RotateCcw className="w-3.5 h-3.5 text-brand-primary stroke-[2.5]" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
