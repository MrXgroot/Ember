import React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function SearchHeader({ query, onQueryChange, className }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-content-primary">
          Search Ember
        </h1>
        <p className="text-xs text-content-secondary">
          Find posts, discussions, communities, and creators.
        </p>
      </div>

      <div className="relative w-full group">
        <SearchIcon className="w-4 h-4 text-content-muted absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search ember..."
          className="w-full h-11 pl-10 pr-10 bg-app-surface border border-app-border rounded-app-md text-sm text-content-primary placeholder:text-content-muted focus:border-brand-primary outline-none transition-colors shadow-surface-sm"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
