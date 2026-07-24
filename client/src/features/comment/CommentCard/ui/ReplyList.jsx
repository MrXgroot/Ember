import React from "react";
import { cn } from "@/shared/integrations/cn";

export function ReplyList({ children, className }) {
  if (!children) return null;

  return (
    <div
      className={cn(
        "ml-2 mt-1 flex flex-col gap-3 border-l border-app-border/60 pl-4 md:pl-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
