import React from "react";
import { cn } from "@/shared/integrations/cn";

export function Brand({ className }) {
  return (
    <a
      href="/"
      className={cn(
        "flex items-center gap-2.5 group select-none transition-opacity hover:opacity-90",
        className,
      )}
    >
      {/* Premium Minimalist Icon Logo - Maps to a perfect circle via rounded-app-md */}
      <div className="w-7 h-7 rounded-app-md bg-brand-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-surface-sm">
        {/* An elegant geometric inner node matching the capsule system */}
        <div className="w-2.5 h-2.5 rounded-full bg-app-bg flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
        </div>
      </div>

      {/* Brand Text Identity: "ember." */}
      <div className="flex items-center font-bold tracking-tight text-base">
        <span className="text-content-primary">ember</span>
        <span className="text-brand-primary font-semibold">.</span>
      </div>
    </a>
  );
}
