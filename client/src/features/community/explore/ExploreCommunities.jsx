import React from "react";
import { cn } from "@/shared/integrations/cn";
import PageLayout from "@/app/layouts/page/PageLayout";
import {
  PageHeader,
  CommunitySearch,
  CommunityFilters,
  CommunityGrid,
  CommunityPagination,
} from "./ui";
import { useExploreCommunitiesController } from "./controller";
export function ExploreCommunities() {
  const controller = useExploreCommunitiesController();
  console.log(controller);
  return (
    <>
      <PageHeader />

      <CommunitySearch
        value={controller.state.searchQuery}
        onChange={controller.actions.setSearchQuery}
      />

      <CommunityFilters
        activeFilter={controller.state.filter}
        onFilterChange={controller.actions.setFilter}
      />

      <CommunityGrid controller={controller} />

      <CommunityPagination
        currentPage={controller.state.page}
        totalPages={controller.state.totalPages}
        onPageChange={controller.actions.setPage}
      />
    </>
  );
}
