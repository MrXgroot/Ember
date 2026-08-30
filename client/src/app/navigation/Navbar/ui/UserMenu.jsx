import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  UserPlus,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { useAuth } from "@/app/auth";

export function UserMenu({ isSearching = false, className }) {
  const { user, accounts, activeAccountId, switchAccount, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) =>
    (name || "User")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const currentDisplayName = user?.displayName || user?.username || "Guest";
  const currentAvatar = user?.avatar;
  const currentId = user?._id || activeAccountId;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          console.log("[UserMenu Debug] Clicked menu. Current state:", {
            user,
            accounts,
            activeAccountId,
          });
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "flex items-center gap-1.5 p-1 rounded-lg select-none shrink-0 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer border border-transparent",
          isOpen && "bg-neutral-100 dark:bg-neutral-800",
          className,
        )}
      >
        <div className="relative shrink-0">
          {currentAvatar ? (
            <img
              src={currentAvatar}
              alt={currentDisplayName}
              referrerPolicy="no-referrer"
              className={cn(
                "rounded-full object-cover border border-neutral-300 dark:border-neutral-700 transition-all",
                isSearching ? "size-6" : "size-8",
              )}
            />
          ) : (
            <div
              className={cn(
                "rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold transition-all",
                isSearching ? "size-6 text-[9px]" : "size-8 text-xs",
              )}
            >
              {getInitials(currentDisplayName)}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
        </div>

        {!isSearching && (
          <ChevronDown
            className={cn(
              "hidden sm:block size-4 text-neutral-500 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        )}
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl py-2 z-[9999]">
          {/* Header */}
          <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Switch Account
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Available accounts:{" "}
              {Array.isArray(accounts) ? accounts.length : 0}
            </p>
          </div>

          {/* Accounts List */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {Array.isArray(accounts) && accounts.length > 0 ? (
              accounts.map((acc, index) => {
                // Resolves nested { user: {...} } or flat account object
                const accUser = acc?.user || acc || {};
                const accountId = acc?.id || acc?._id || accUser?._id;
                const name =
                  accUser?.displayName || accUser?.username || "Unnamed User";
                const email = accUser?.email;
                const avatarUrl = accUser?.avatar;
                const isActive =
                  accountId === currentId || acc?.id === activeAccountId;

                return (
                  <button
                    key={accountId || index}
                    type="button"
                    onClick={() => {
                      console.log("[UserMenu Debug] Switching to:", accountId);
                      if (accountId) {
                        switchAccount(accountId);
                      }
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
                      isActive &&
                        "bg-neutral-50 dark:bg-neutral-800/60 font-medium",
                    )}
                  >
                    {/* Account Avatar */}
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="size-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 shrink-0"
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {getInitials(name)}
                      </div>
                    )}

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-neutral-900 dark:text-neutral-100 leading-tight">
                        {name}
                      </p>
                      {email && (
                        <p className="truncate text-xs text-neutral-500 leading-tight mt-0.5">
                          {email}
                        </p>
                      )}
                    </div>

                    {/* Active State Checkmark */}
                    {isActive && (
                      <Check className="size-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex items-center gap-2 px-4 py-3 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 my-1 mx-2 rounded-lg">
                <AlertCircle className="size-4 shrink-0" />
                <span>No stored accounts found in auth state.</span>
              </div>
            )}
          </div>

          <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />

          {/* Footer Actions */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              // Hook your login modal / OAuth redirect trigger here
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <UserPlus className="size-4 text-neutral-400" />
            <span>Add another account</span>
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
