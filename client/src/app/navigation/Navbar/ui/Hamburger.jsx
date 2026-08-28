import React from "react";
import { Menu } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Hamburger({ isSearching = false, className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      className={cn(
        "flex items-center justify-center rounded-app-md text-content-secondary",
        "hover:text-content-primary hover:bg-app-bg transition-all select-none shrink-0",
        isSearching ? "size-7 p-0" : "size-8 sm:size-9",
        className,
      )}
    >
      <Menu
        className={cn("transition-all", isSearching ? "size-3.5" : "size-5")}
      />
    </button>
  );
}
