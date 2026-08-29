import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/app/auth";
import { cn } from "@/shared/integrations/cn";

export const Footer = ({ className }) => {
  const { logout } = useAuth();

  return (
    <div className={cn("pt-4 border-t border-app-border", className)}>
      <button
        type="button"
        onClick={() => logout()}
        className={cn(
          "group w-full flex items-center gap-3 px-3 py-2 rounded-app-md text-sm font-medium transition-all duration-150",
          "text-content-secondary hover:text-red-500 hover:bg-red-500/10",
        )}
      >
        <LogOut className="w-5 h-5 transition-colors duration-150 shrink-0 text-content-muted group-hover:text-red-500" />
        <span className="truncate">Log Out</span>
      </button>
    </div>
  );
};
