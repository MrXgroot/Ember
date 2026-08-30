import React, { useMemo, useState } from "react";
import PageLayout from "@/app/layouts/page/PageLayout";
import { useCommunities } from "@/features/community/hooks";

import { PageHeader } from "./ui/PageHeader";
import { CommunityControls } from "./ui/CommunityControls";
import { CommunityGrid } from "./ui/CommunityGrid";
import { CommunityPagination } from "./ui/CommunityPagination";

export function ExploreCommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("popular");
  const [page, setPage] = useState(1);
  const limit = 12;

  const request = useMemo(
    () => ({
      filters: {
        search: searchQuery.trim() || undefined,
      },
      options: {
        page,
        limit,
        sort: filter,
      },
    }),
    [searchQuery, filter, page, limit],
  );

  const { data: communities = [], isLoading, error } = useCommunities(request);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setPage(1);
  };

  const handleFilterChange = (tabKey) => {
    setFilter(tabKey);
    setPage(1);
  };

  return (
    <PageLayout>
      <div className="max-w-5xl w-full mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8">
        <PageHeader />

        <CommunityControls
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeFilter={filter}
          onFilterChange={handleFilterChange}
        />

        <CommunityGrid
          communities={communities}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
        />

        {!isLoading && !error && communities.length > 0 && (
          <CommunityPagination
            currentPage={page}
            onPageChange={setPage}
            isLastPage={communities.length < limit}
          />
        )}
      </div>
    </PageLayout>
  );
}
