import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Search({ className }) {
  return (
    <div className={cn("relative w-full group", className)}>
      {/* Icon Wrapper */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="w-4 h-4 text-content-muted group-focus-within:text-brand-primary transition-colors duration-150" />
      </div>

      {/* Native Input Node */}
      <input
        type="text"
        placeholder="Search posts, communities, or users..."
        className={cn(
          "w-full h-9 pl-10 pr-4 rounded-app-md text-sm transition-all duration-150 outline-none",
          "bg-app-bg text-content-primary placeholder:text-content-muted",
          "border border-app-border focus:border-brand-primary focus:bg-app-bg/50",
          "focus:ring-1 focus:ring-brand-primary/20",
        )}
      />
    </div>
  );
}
