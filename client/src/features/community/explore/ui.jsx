import React from "react";
import {
  Search,
  Compass,
  ShieldAlert,
  Users,
  TrendingUp,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { Button } from "@/shared/ui";

/**
 * 1. PageHeader
 */
export function PageHeader() {
  return (
    <div className="flex flex-col gap-1.5 border-b border-app-border/40 pb-4">
      <div className="flex items-center gap-2 text-brand-primary">
        <Compass className="w-5 h-5" />
        <h1 className="text-xl md:text-2xl font-extrabold text-content-primary tracking-tight">
          Explore Communities
        </h1>
      </div>
      <p className="text-sm text-content-secondary max-w-xl font-normal">
        Discover spaces matching your stack, specialities, or favorite spaces
        across Ember.
      </p>
    </div>
  );
}

/**
 * 2. CommunitySearch
 */
export function CommunitySearch({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search topics, interests, keywords..."
        className="w-full h-10 pl-10 pr-4 bg-app-bg border border-app-border rounded-app-md text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary/60 transition-colors shadow-inner"
      />
    </div>
  );
}

/**
 * 3. CommunityFilters
 */
export function CommunityFilters({ activeFilter, onFilterChange }) {
  const categories = [
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "new", label: "Newest", icon: Sparkles },
    { id: "gaming", label: "Gaming" },
    { id: "tech", label: "Technology" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeFilter === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 h-8 text-xs font-semibold rounded-full border transition-all duration-150",
              isActive
                ? "bg-brand-light/10 border-brand-primary text-brand-primary font-bold"
                : "bg-app-bg border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface",
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * 4. CommunityGrid (Loader, Error, Empty, Map)
 */

export function CommunityGrid({ controller }) {
  const { communities = [], actions } = controller;

  if (!communities.length) {
    return (
      <div className="flex flex-col items-center gap-3 p-12 text-center border border-dashed border-app-border rounded-app-xl bg-app-surface/20">
        <Users className="w-8 h-8 text-content-muted" />
        <p className="text-sm font-semibold text-content-muted">
          No communities found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {communities.map((community) => {
        const letters = community.name.slice(0, 2).toUpperCase();

        return (
          <div
            key={community._id}
            className="p-5 bg-app-surface border border-app-border rounded-app-xl flex flex-col gap-3 shadow-surface-sm hover:border-app-border/80 transition-colors"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full border border-app-border bg-app-bg flex items-center justify-center font-bold text-brand-primary overflow-hidden">
                  {community.avatar ? (
                    <img
                      src={community.avatar}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    letters
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold truncate">r/{community.name}</h3>

                  <p className="text-xs text-content-muted">
                    {community.membersCount ?? 0} members
                  </p>
                </div>
              </div>

              <button
                onClick={() => actions.toggleJoin?.(community._id)}
                className={cn(
                  "px-3 h-7 rounded-full text-xs font-semibold",
                  community.isJoined
                    ? "border border-app-border"
                    : "bg-white text-black",
                )}
              >
                {community.isJoined ? "Joined" : "Join"}
              </button>
            </div>

            <p className="text-sm text-content-secondary line-clamp-2">
              {community.description || "No description available."}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * 5. CommunityPagination
 */
export function CommunityPagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-app-border/40 pt-4 mt-2">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-content-primary disabled:opacity-40 disabled:hover:text-content-secondary transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Previous</span>
      </button>

      <div className="text-xs font-semibold text-content-muted">
        Page{" "}
        <span className="text-content-primary font-bold">{currentPage}</span> of{" "}
        {totalPages}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-content-primary disabled:opacity-40 disabled:hover:text-content-secondary transition-colors"
      >
        <span>Next</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
