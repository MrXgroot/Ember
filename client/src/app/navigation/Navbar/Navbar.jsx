import React, { useState, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Brand } from "./ui/Brand";
import { Search } from "./ui/Search";
import { MessageAction } from "./ui/MessageAction";
import { NotificationAction } from "./ui/NotificationAction";
import { CreateAction } from "./ui/CreateAction";
import { UserMenu } from "./ui/UserMenu";
import { Hamburger } from "./ui/Hamburger";

import { cn } from "@/shared/integrations/cn";

export function Navbar({ className, onToggle }) {
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const { pathname } = useLocation();

  const isCreatePostPage = pathname === "/post/create";

  const handleStartSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 60);
  };

  const handleStopSearch = () => {
    setIsSearching(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full h-14",
        "bg-app-surface border-b border-app-border",
        "flex items-center justify-between",
        "px-2.5 sm:px-4 shrink-0",
        className,
      )}
    >
      {/* Left Zone */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <Hamburger isSearching={isSearching} onClick={onToggle} />
        <Brand />
      </div>

      {/* Center Zone */}
      <div
        className={cn(
          "flex items-center transition-all duration-200 ease-out",
          isSearching
            ? "flex-1 mx-2 opacity-100"
            : "hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4",
        )}
      >
        <div className="relative w-full flex items-center">
          <Search ref={searchInputRef} />

          {isSearching && (
            <button
              type="button"
              onClick={handleStopSearch}
              aria-label="Cancel search"
              className="absolute right-2 p-1 text-content-muted hover:text-content-primary md:hidden cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right Zone */}
      <div
        className={cn(
          "flex items-center shrink-0 transition-all duration-150",
          isSearching ? "gap-1" : "gap-1.5 sm:gap-2",
        )}
      >
        {/* Mobile Search */}
        {!isSearching && (
          <button
            type="button"
            onClick={handleStartSearch}
            aria-label="Open search"
            className="flex md:hidden items-center justify-center size-8 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg cursor-pointer"
          >
            <SearchIcon className="size-4" />
          </button>
        )}

        {/* Navbar Actions */}
        {!isSearching && !isCreatePostPage && (
          <>
            <MessageAction />
            <NotificationAction />
            <CreateAction />
          </>
        )}

        <div className="h-4 w-px bg-app-border mx-0.5" />

        {/* User Menu */}
        <UserMenu isSearching={isSearching} />
      </div>
    </header>
  );
}
