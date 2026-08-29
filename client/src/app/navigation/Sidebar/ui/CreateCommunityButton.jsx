import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CreateCommunityButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full flex items-center gap-3 px-3 py-2 rounded-app-md text-sm font-medium transition-all duration-150 cursor-pointer",
        "text-content-secondary hover:text-content-primary hover:bg-app-surface",
        "border border-dashed border-app-border hover:border-app-border-hover",
        className,
      )}
    >
      <div className="w-5 h-5 rounded-app-sm bg-app-surface group-hover:bg-brand-light flex items-center justify-center transition-colors duration-150 shrink-0">
        <Plus className="w-3.5 h-3.5 text-content-muted group-hover:text-brand-hover transition-colors duration-150" />
      </div>
      <span className="truncate">Create Community</span>
    </button>
  );
}
