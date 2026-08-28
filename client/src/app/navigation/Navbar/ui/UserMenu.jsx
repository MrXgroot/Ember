import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { useAuthStore } from "@/app/auth/store";

export function UserMenu({ isSearching = false, className, onClick }) {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.displayName || user?.username || "Guest";
  const avatar = user?.avatar;
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 p-0.5 rounded-app-md select-none shrink-0 transition-all hover:bg-app-bg",
        className,
      )}
    >
      {/* Avatar (Scales down during search) */}
      <div className="relative shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={displayName}
            referrerPolicy="no-referrer"
            className={cn(
              "rounded-full object-cover border border-app-border transition-all",
              isSearching ? "size-6" : "size-7 sm:size-8",
            )}
          />
        ) : (
          <div
            className={cn(
              "rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center font-bold text-brand-primary transition-all",
              isSearching
                ? "size-6 text-[9px]"
                : "size-7 sm:size-8 text-[10px]",
            )}
          >
            {initials}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-app-surface" />
      </div>

      {/* Chevron dropdown */}
      {!isSearching && (
        <ChevronDown className="hidden lg:block size-3.5 text-content-muted shrink-0" />
      )}
    </button>
  );
}

export default UserMenu;
