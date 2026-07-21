import React from "react";
import { Sparkles, Flame } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function EmptyState({ className }) {
  return (
    <div
      className={cn(
        // 1. Structure: Centered container matching our large card roundness
        "w-full py-16 px-4 flex flex-col items-center justify-center text-center",
        // 2. Token Skin: Soft border outline sitting on the midnight background grid
        "bg-app-surface/40 border border-dashed border-app-border rounded-app-lg",
        className,
      )}
    >
      {/* Visual Identity Anchor: Glowing token accent circle icon */}
      <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-4 animate-pulse">
        <Sparkles className="w-5 h-5 stroke-[2]" />
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col gap-1 max-w-sm mb-6">
        <h3 className="text-base font-semibold tracking-wide text-content-primary">
          The feed is dark right now
        </h3>
        <p className="text-xs text-content-secondary leading-relaxed tracking-wide">
          No posts have drifted into this corner yet. Be the first to spark a
          discussion in this space.
        </p>
      </div>

      {/* Primary Action Trigger: Fully integrated capsule shape button */}
      <button
        className={cn(
          "flex items-center gap-2 h-9 px-4 rounded-app-md text-xs font-semibold tracking-wide transition-all duration-150 shadow-surface-sm",
          "bg-brand-primary text-white hover:bg-brand-hover active:scale-95",
        )}
      >
        <Flame className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
        <span>Spark the First Post</span>
      </button>
    </div>
  );
}
