import React from "react";
import { cn } from "@/shared/integrations/cn";

export function Main({ children, className }) {
  return (
    <main
      className={cn("flex-1 h-full overflow-y-auto bg-app-bg/50", className)}
    >
      {children}
    </main>
  );
}
