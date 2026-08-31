import React from "react";
import { NavLink } from "react-router-dom";
import { Plus, AlertCircle } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export const CommunityItem = ({ name, to, className }) => {
  const displayLetters =
    name
      ?.replace(/^(r|c)\//, "")
      .slice(0, 2)
      .toUpperCase() || "C";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm transition-colors duration-150",
          "text-content-secondary hover:text-content-primary hover:bg-app-surface",
          isActive && "bg-brand-light text-brand-hover font-semibold",
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 transition-colors",
              "bg-app-surface text-content-muted border border-app-border",
              "group-hover:text-content-primary",
              isActive && "bg-brand-primary text-app-bg border-transparent",
            )}
          >
            {displayLetters}
          </div>
          <span className="truncate flex-1 font-normal">{name}</span>
        </>
      )}
    </NavLink>
  );
};

export const CommunityList = ({
  communities = [],
  loading = false,
  error = false,
  onCreateClick,
  className,
}) => {
  const hasCommunities = Array.isArray(communities) && communities.length > 0;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* 1. Header with subtle inline actions */}
      <div className="flex items-center justify-between px-3 py-1">
        <span className="text-[11px] font-semibold tracking-wider text-content-muted uppercase">
          Communities
        </span>

        <div className="flex items-center gap-2">
          {/* Subtle Explore Link */}
          <NavLink
            to="/communities"
            className="text-[11px] font-medium text-content-muted hover:text-content-primary transition-colors"
          >
            Explore
          </NavLink>

          {/* Inline Create Button */}
          {onCreateClick && (
            <button
              type="button"
              onClick={onCreateClick}
              title="Create Community"
              className="text-content-muted hover:text-content-primary transition-colors p-0.5"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex flex-col gap-0.5">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col gap-1 px-3 py-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-1.5 animate-pulse"
              >
                <div className="w-5 h-5 rounded-full bg-app-surface shrink-0" />
                <div className="h-3 w-24 bg-app-surface rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-red-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Failed to load</span>
          </div>
        )}

        {/* Clean, boxless empty state */}
        {!loading && !error && !hasCommunities && (
          <p className="px-3 py-2 text-xs text-content-muted">
            No communities joined yet.
          </p>
        )}

        {/* Community Links */}
        {!loading &&
          !error &&
          hasCommunities &&
          communities.map((community) => (
            <CommunityItem
              key={community._id || community.id || community.name}
              name={community.name}
              to={community.href || `/c/${community.slug}`}
            />
          ))}
      </div>
    </div>
  );
};
