import React from "react";
import { Compass } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function PageHeader({ className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2 text-brand-primary">
        <Compass className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wider uppercase">
          Discovery
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
        Explore Communities
      </h1>
      <p className="text-sm text-content-secondary max-w-xl">
        Find spaces centered around your interests, connect with members, and
        discover new discussions.
      </p>
    </div>
  );
}
