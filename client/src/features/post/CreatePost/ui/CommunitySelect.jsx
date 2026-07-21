import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommunitySelect({
  selected,
  options = [],
  onSelect,
  className,
}) {
  return (
    <div className={cn("relative inline-block self-start", className)}>
      <select
        value={selected?.id || ""}
        onChange={(e) => {
          const matched = options.find((opt) => opt.id === e.target.value);
          onSelect?.(matched || null);
        }}
        className={cn(
          "appearance-none flex items-center gap-2 h-8 pl-3 pr-8 rounded-app-md text-xs font-medium cursor-pointer transition-colors outline-none",
          "bg-app-bg border border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface",
        )}
      >
        <option value="" disabled>
          Choose a community
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-content-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
