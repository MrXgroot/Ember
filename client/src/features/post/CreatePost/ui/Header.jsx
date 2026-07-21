import React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Header({ onClose, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between pb-1 border-b border-app-border/40",
        className,
      )}
    >
      <h2 className="text-base font-semibold tracking-wide text-content-primary">
        Create a Post
      </h2>
      <button
        onClick={onClose}
        className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
        aria-label="Close modal"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
