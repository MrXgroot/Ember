import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import PageLayout from "@/app/layouts/page/PageLayout";
import { SearchHeader } from "./ui/SearchHeader";
import { SearchTabs } from "./ui/SearchTabs";
import { SearchResults } from "./ui/SearchResults";

import { useSearch } from "@/features/search/hooks/useSearch";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState("all");

  const controller = useSearch({
    query,
    type: activeTab,
  });

  return (
    <PageLayout>
      <div className="w-full flex flex-col gap-6 pb-12">
        <SearchTabs activeTab={activeTab} onChange={setActiveTab} />

        <SearchResults type={activeTab} controller={controller} />
      </div>
    </PageLayout>
  );
}
