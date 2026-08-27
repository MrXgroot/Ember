import React, { useState } from "react";
import { useUsers } from "@/features/user/hooks/useUsers";
import { cn } from "@/shared/integrations/cn";

import { ExploreUsersHeader } from "./ui/ExploreUsersHeader";
import { UserGrid } from "./ui/UserGrid";
import { UserLoadingState } from "./ui/UserLoadingState";
import { UserErrorState } from "./ui/UserErrorState";
import { UserEmptyState } from "./ui/UserEmptyState";

export function ExploreUsersPage({ className }) {
  const { data, isLoading, isError, refetch } = useUsers();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "online"

  const users = Array.isArray(data)
    ? data
    : (data?.data?.users ?? data?.users ?? data?.data ?? []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u?.displayName || "").toLowerCase().includes(search.toLowerCase()) ||
      (u?.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (u?.bio || "").toLowerCase().includes(search.toLowerCase());

    if (filter === "online") return matchesSearch && u?.isOnline;
    return matchesSearch;
  });

  return (
    <div className={cn("w-full flex flex-col gap-6 pb-12", className)}>
      <ExploreUsersHeader
        totalCount={users.length}
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      {isLoading && <UserLoadingState count={6} />}

      {isError && <UserErrorState onRetry={refetch} />}

      {!isLoading && !isError && filteredUsers.length === 0 && (
        <UserEmptyState search={search} />
      )}

      {!isLoading && !isError && filteredUsers.length > 0 && (
        <UserGrid users={filteredUsers} />
      )}
    </div>
  );
}

export default ExploreUsersPage;
