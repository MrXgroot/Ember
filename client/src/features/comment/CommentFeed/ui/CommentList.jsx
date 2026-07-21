import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommentList({ children, className }) {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {children}
    </div>
  );
}
