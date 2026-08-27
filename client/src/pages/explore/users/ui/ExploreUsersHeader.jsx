import React from "react";
import { UserSearch } from "./UserSearch";

export function ExploreUsersHeader({
  totalCount = 0,
  search,
  onSearchChange,
  filter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-app-border pb-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-content-primary">
            Explore Community
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-app-md bg-brand-light text-brand-primary font-semibold">
            {totalCount} members
          </span>
        </div>
        <p className="text-xs text-content-secondary">
          Discover active members, start direct conversations, and grow your
          network on ember.
        </p>
      </div>

      <UserSearch
        search={search}
        onSearchChange={onSearchChange}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

export default ExploreUsersHeader;
