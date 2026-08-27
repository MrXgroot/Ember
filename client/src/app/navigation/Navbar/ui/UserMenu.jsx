import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { useAuthStore } from "@/app/auth/store";

export function UserMenu({ className, onClick }) {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.displayName || user?.username || "Guest";
  const username = user?.username
    ? `@${user.username.replace(/\s+/g, "_").toLowerCase()}`
    : user?.email || "";
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
        "flex items-center gap-2.5 p-1.5 pr-2.5 rounded-app-md text-left transition-all duration-150 select-none",
        "hover:bg-app-bg border border-transparent hover:border-app-border group focus:outline-none focus:ring-1 focus:ring-brand-primary/40",
        className,
      )}
    >
      {/* Avatar Container with Active Status Ring */}
      <div className="relative shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-app-border group-hover:border-zinc-700/60 transition-colors"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary tracking-tight">
            {initials}
          </div>
        )}
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-app-surface" />
      </div>

      {/* Identity Details */}
      <div className="hidden lg:flex flex-col min-w-0 max-w-[120px] text-left">
        <span className="text-xs font-semibold text-content-primary truncate group-hover:text-brand-primary transition-colors leading-tight">
          {displayName}
        </span>
        <span className="text-[10px] text-content-muted truncate leading-tight mt-0.5">
          {username}
        </span>
      </div>

      {/* Dropdown Chevron */}
      <ChevronDown className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary transition-transform duration-150 group-data-[state=open]:rotate-180 shrink-0 ml-0.5" />
    </button>
  );
}

export default UserMenu;
