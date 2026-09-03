import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  UserPlus,
  LogIn,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { useAuth } from "@/app/auth";
import { useModal } from "@/app/modal";

export function UserMenu({ isSearching = false, className }) {
  const { user, accounts, activeAccountId, switchAccount, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { open } = useModal();

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

  const hasAccounts = Array.isArray(accounts) && accounts.length > 0;
  const isLoggedIn = !!user || hasAccounts;
  const currentDisplayName =
    user?.displayName || user?.username || (isLoggedIn ? "Account" : "Sign In");
  const currentAvatar = user?.avatar;
  const currentId = user?._id || activeAccountId;

  const handleOpenAuthModal = () => {
    setIsOpen(false);
    open("auth");
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          // If completely unauthenticated with no saved accounts, open modal directly
          if (!isLoggedIn) {
            handleOpenAuthModal();
            return;
          }
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "flex items-center gap-2 p-1.5 rounded-app-md select-none shrink-0 transition-all hover:bg-app-surface cursor-pointer border border-transparent",
          isOpen && "bg-app-surface",
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
                "rounded-full object-cover border border-app-border transition-all",
                isSearching ? "size-6" : "size-8",
              )}
            />
          ) : isLoggedIn ? (
            <div
              className={cn(
                "rounded-full bg-brand-light text-brand-hover border border-brand-primary/20 flex items-center justify-center font-bold transition-all",
                isSearching ? "size-6 text-[9px]" : "size-8 text-xs",
              )}
            >
              {getInitials(currentDisplayName)}
            </div>
          ) : (
            <div
              className={cn(
                "rounded-full bg-app-surface text-content-muted border border-app-border flex items-center justify-center transition-all",
                isSearching ? "size-6" : "size-8",
              )}
            >
              <UserIcon className={isSearching ? "size-3.5" : "size-4"} />
            </div>
          )}

          {isLoggedIn && (
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-app-bg" />
          )}
        </div>

        {!isSearching && (
          <ChevronDown
            className={cn(
              "hidden sm:block size-4 text-content-muted transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        )}
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-app-lg bg-app-surface border border-app-border shadow-2xl py-2 z-[9999]">
          {/* Header */}
          <div className="px-4 py-2 border-b border-app-border">
            <p className="text-xs font-semibold text-content-muted uppercase tracking-wider">
              {hasAccounts ? "Switch Account" : "Account"}
            </p>
            {hasAccounts && (
              <p className="text-[11px] text-content-muted mt-0.5">
                Available accounts: {accounts.length}
              </p>
            )}
          </div>

          {/* Accounts List OR Empty State Action */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {hasAccounts ? (
              accounts.map((acc, index) => {
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
                      if (accountId) {
                        switchAccount(accountId);
                      }
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-app-bg cursor-pointer",
                      isActive && "bg-app-bg/60 font-medium",
                    )}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="size-8 rounded-full object-cover border border-app-border shrink-0"
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-brand-light text-brand-hover border border-brand-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
                        {getInitials(name)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-content-primary leading-tight">
                        {name}
                      </p>
                      {email && (
                        <p className="truncate text-xs text-content-muted leading-tight mt-0.5">
                          {email}
                        </p>
                      )}
                    </div>

                    {isActive && (
                      <Check className="size-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })
            ) : (
              /* If no accounts exist in state, show login callout */
              <div className="p-3">
                <button
                  type="button"
                  onClick={handleOpenAuthModal}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-app-md bg-brand-primary text-app-bg text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                >
                  <LogIn className="size-4" />
                  <span>Log in or Sign up</span>
                </button>
              </div>
            )}
          </div>

          <div className="my-1 border-t border-app-border" />

          {/* Footer Actions */}
          {hasAccounts && (
            <button
              type="button"
              onClick={handleOpenAuthModal}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-content-secondary hover:text-content-primary hover:bg-app-bg transition-colors"
            >
              <UserPlus className="size-4 text-content-muted" />
              <span>Add another account</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
