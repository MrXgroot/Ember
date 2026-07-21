import React from "react";
import { cn } from "@/shared/integrations/cn";

function createSlot(displayName, className) {
  function Slot({ children, className: override }) {
    return <section className={cn(className, override)}>{children}</section>;
  }

  Slot.displayName = displayName;

  return Slot;
}

export function PostLayout({ children, className }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-app-xl",
        "border border-app-border",
        "bg-app-surface shadow-surface-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

PostLayout.Post = createSlot("PostLayout.Post", "p-6 md:p-8");

PostLayout.Composer = createSlot(
  "PostLayout.Composer",
  "border-t border-app-border/60 bg-app-bg/40 p-6 md:p-8",
);

PostLayout.Comments = createSlot(
  "PostLayout.Comments",
  "border-t border-app-border/60 p-6 md:p-8",
);
