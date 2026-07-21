import React from "react";
import { cn } from "@/shared/integrations/cn";
import { NavigationList, CommunityList, Footer } from "./ui";

export function Sidebar({ className }) {
  return (
    <aside
      className={cn(
        // 1. Core Architectural Constraints
        "w-64 h-full shrink-0 flex flex-col justify-between",

        // 2. Surface Design Tokens (From our CSS-first dark theme)
        "bg-app-bg border-r border-app-border px-4 py-6",

        // 3. Extensibility point for composition overrides (Width, margin adjustments by AppBody)
        className,
      )}
    >
      {/* Structural Grouping for Top-Level Interactive Contexts */}
      <div className="flex flex-col gap-6">
        <NavigationList />

        <hr className="border-app-border mx-1" />

        <CommunityList />
      </div>

      {/* Pinned directly to the bottom boundaries of the container block */}
      <Footer />
    </aside>
  );
}
