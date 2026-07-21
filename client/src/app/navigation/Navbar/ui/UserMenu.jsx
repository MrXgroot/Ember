import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function UserMenu({ className }) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 p-1.5 pr-2 rounded-app-md text-left transition-all duration-150 select-none",
        "hover:bg-app-bg border border-transparent hover:border-app-border group",
        className,
      )}
    >
      {/* Structured Minimal Avatar Canvas Layer */}
      <div className="w-6 h-6 rounded-md bg-brand-light border border-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary tracking-wide">
        SU
      </div>

      {/* Identity Label Track - automatically compressed on constrained displays */}
      <div className="hidden lg:flex flex-col text-xs leading-none">
        <span className="font-medium text-content-primary group-hover:text-zinc-100">
          sukesh_acharya
        </span>
        <span className="text-[10px] text-content-muted mt-0.5">
          1.2k karma
        </span>
      </div>

      {/* Orientation indicator element */}
      <ChevronDown className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary transition-colors duration-150" />
    </button>
  );
}
