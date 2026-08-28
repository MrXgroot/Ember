import React from "react";
import { Menu } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Hamburger({ className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      className={cn(
        "flex items-center justify-center size-8 sm:size-9 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg transition-colors",
        className,
      )}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
