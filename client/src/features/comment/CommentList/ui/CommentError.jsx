import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommentError({ onRetry, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 border border-red-500/20 bg-red-500/5 rounded-app-lg text-center gap-2",
        className,
      )}
    >
      <AlertCircle className="w-5 h-5 text-red-400" />
      <p className="text-xs font-medium text-content-secondary">
        Failed to load comments.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold text-brand-primary hover:underline mt-1"
        >
          Try again
        </button>
      )}
    </div>
  );
}
