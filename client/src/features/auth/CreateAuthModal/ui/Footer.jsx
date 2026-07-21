import React from "react";
import { cn } from "@/shared/integrations/cn";

export function Footer({ className }) {
  return (
    <div
      className={cn(
        "text-center text-xs text-content-secondary pt-2 border-t border-app-border/40",
        className,
      )}
    >
      <span>New to the platform? </span>
      <a
        href="/signup"
        className="text-brand-primary hover:text-brand-hover font-semibold transition-colors hover:underline ml-0.5"
      >
        Sign Up
      </a>
    </div>
  );
}
