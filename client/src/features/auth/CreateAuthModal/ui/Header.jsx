import React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Header({ onClose, className }) {
  return (
    <div
      className={cn("flex flex-col gap-1 pb-1 text-center relative", className)}
    >
      <h2 className="text-xl font-bold tracking-wide text-content-primary mt-2">
        Welcome back
      </h2>
      <p className="text-xs text-content-secondary">
        By continuing, you agree to our User Agreement and Privacy Policy.
      </p>

      <button
        onClick={onClose}
        className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors absolute right-0 top-0"
        aria-label="Close modal"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
