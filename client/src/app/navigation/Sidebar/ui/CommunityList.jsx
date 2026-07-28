import React from "react";
import { Plus, Compass, AlertCircle } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export const CommunityItem = ({ name, href, isActive, className }) => {
  const displayLetters =
    name?.replace(/^r\//, "").slice(0, 2).toUpperCase() || "C";

  return (
    <a
      href={href || `#`}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm transition-all duration-150 ease-out",
        "text-content-secondary hover:text-content-primary hover:bg-app-surface",
        isActive && "bg-brand-light text-brand-primary font-medium",
        className,
      )}
    >
      {/* Mini Avatar */}
      <div
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 transition-colors duration-150",
          "bg-app-surface text-content-muted border border-app-border",
          "group-hover:bg-brand-light group-hover:text-brand-primary group-hover:border-transparent",
          isActive && "bg-brand-primary text-app-bg border-transparent",
        )}
      >
        {displayLetters}
      </div>

      <span className="truncate flex-1 font-normal tracking-wide text-zinc-300 group-hover:text-zinc-100">
        {name}
      </span>
    </a>
  );
};

export const CommunityList = ({
  communities = [],
  loading = false,
  error = false,
  onExploreClick,
  className,
}) => {
  // Normalize checking if communities has array items
  const hasCommunities = Array.isArray(communities) && communities.length > 0;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="px-3 text-[10px] font-semibold tracking-widest text-content-muted/70 uppercase">
        Communities
      </div>

      <div className="flex flex-col gap-0.5">
        {/* 1. LOADING SKELETON STATE */}
        {loading && (
          <div className="flex flex-col gap-1 px-1 py-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-2 py-2 rounded-app-md animate-pulse"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
                <div className="h-3 w-28 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* 2. ERROR STATE */}
        {!loading && error && (
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 bg-red-500/5 rounded-app-md border border-red-500/10 my-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Failed to load</span>
          </div>
        )}

        {/* 3. EMPTY STATE BACKUP */}
        {!loading && !error && !hasCommunities && (
          <div className="flex flex-col gap-1 px-3 py-2.5 bg-app-surface/40 border border-dashed border-app-border/60 rounded-app-md my-0.5">
            <p className="text-xs font-normal text-content-muted leading-snug">
              No communities joined yet.
            </p>
          </div>
        )}

        {/* 4. SUCCESSFUL LIST MAP */}
        {!loading &&
          !error &&
          hasCommunities &&
          communities.map((community) => (
            <CommunityItem
              key={community._id || community.id || community.name}
              name={community.name}
              href={community.href || `/c/${community.name}`}
            />
          ))}

        {/* 5. EXPLORE ALL ACTION BUTTON */}
        <button
          onClick={onExploreClick}
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm text-left transition-all duration-150 ease-out",
            "text-content-secondary hover:text-content-primary hover:bg-app-surface",
          )}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-app-surface text-content-muted border border-app-border group-hover:bg-brand-light group-hover:text-brand-primary group-hover:border-transparent transition-colors shrink-0">
            <Compass className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span className="text-sm font-normal tracking-wide text-zinc-300 group-hover:text-zinc-100">
            Explore All
          </span>
        </button>
      </div>
    </div>
  );
};
