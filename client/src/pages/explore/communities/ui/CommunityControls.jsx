import React from "react";
import { Search, TrendingUp, Clock, Sparkles } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

const FILTER_TABS = [
  { key: "popular", label: "Popular", icon: TrendingUp },
  { key: "newest", label: "Newest", icon: Clock },
  { key: "featured", label: "Featured", icon: Sparkles },
];

export function CommunityControls({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4",
        className,
      )}
    >
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search communities by name or keyword..."
          className="w-full rounded-full bg-app-surface/50 border border-app-border pl-10 pr-4 py-2 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-app-surface/40 p-1 rounded-full border border-app-border self-start sm:self-auto">
        {FILTER_TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150",
              activeFilter === key
                ? "bg-brand-light text-brand-hover font-semibold shadow-sm"
                : "text-content-muted hover:text-content-primary",
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
