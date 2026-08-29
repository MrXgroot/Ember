import React from "react";
import { cn } from "@/shared/integrations/cn";
import { useCommunities } from "@/features/community/hooks";
// Assuming you have a standard session hook to grab the authenticated identity
import { useAuth } from "@/app/auth";
import {
  NavigationList,
  CreateCommunityButton,
  CommunityList,
  Footer,
} from "./ui";
import { useModal } from "@/app/modal";
import { useAuthGuard } from "@/app/auth";
export function Sidebar({ className }) {
  const { user } = useAuth();

  // Dynamically fetch communities where the current active session user is a member
  const {
    data: communities,
    isPending,
    isError,
  } = useCommunities(
    {
      filters: {
        member: user?._id,
      },
    },
    {
      enabled: !!user?._id,
    },
  );
  const auth = useAuthGuard();
  const modal = useModal();

  return (
    <aside
      className={cn(
        // 1. Core Architectural Constraints
        "w-64 h-full shrink-0 flex flex-col justify-between",

        // 2. Surface Design Tokens (From our CSS-first dark theme)
        "bg-app-bg border-r border-app-border px-4 py-6",

        // 3. Extensibility point for composition overrides
        className,
      )}
    >
      {/* Structural Grouping for Top-Level Interactive Contexts */}
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-12rem)] no-scrollbar">
        <NavigationList />

        <hr className="border-app-border mx-1 opacity-40" />
        <CreateCommunityButton
          onClick={() => auth.require(() => modal.open("createCommunity"))}
        />

        {/* Passing dynamic collection and query states down to handle loaders/empty states */}
        <CommunityList
          communities={communities}
          loading={isPending}
          error={isError}
        />
      </div>

      {/* Pinned directly to the bottom boundaries of the container block */}
      <Footer />
    </aside>
  );
}
