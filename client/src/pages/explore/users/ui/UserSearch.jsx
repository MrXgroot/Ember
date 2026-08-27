import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function UserSearch({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-64 group">
        <Search className="w-3.5 h-3.5 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search members..."
          className="w-full h-9 pl-9 pr-3 bg-app-surface border border-app-border rounded-app-md text-xs text-content-primary placeholder:text-content-muted focus:border-brand-primary outline-none transition-colors shadow-surface-sm"
        />
      </div>

      <button
        onClick={() => onFilterChange(filter === "all" ? "online" : "all")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 h-9 rounded-app-md text-xs font-semibold transition-all select-none shrink-0 border",
          filter === "online"
            ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-400"
            : "bg-app-surface border-app-border text-content-secondary hover:text-content-primary",
        )}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>Online</span>
      </button>
    </div>
  );
}

export default UserSearch;
