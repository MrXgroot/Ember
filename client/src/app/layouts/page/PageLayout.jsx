import React from "react";
import { cn } from "@/shared/integrations/cn";

function PageLayout({
  children,
  sidebar,
  className,
  contentClassName,
  sidebarClassName,
}) {
  return (
    <div
      className={cn(
        // Outer Container: Center alignment framework
        "w-full max-w-7xl mx-auto px-4 py-6 md:px-8",
        // Responsive Layout: Single column on mobile, balanced asymmetrical grid on desktop (xl)
        "flex flex-col xl:grid xl:grid-cols-12 xl:gap-8",
        className,
      )}
    >
      {/* ─── MAIN CONTENT CONTAINER (Appx 63% Width) ─── */}
      <div className={cn("min-w-0 xl:col-span-8", contentClassName)}>
        {children}
      </div>

      {/* ─── RIGHT SIDEBAR CONTAINER (Appx 37% Width / ~1/3) ─── */}
      {sidebar && (
        <aside
          className={cn(
            "hidden xl:block xl:col-span-4",
            "sticky top-0 h-fit", // Added basic sticky framework so it doesn't leave blank space on scroll
            sidebarClassName,
          )}
        >
          {sidebar}
        </aside>
      )}
    </div>
  );
}

export default PageLayout;
