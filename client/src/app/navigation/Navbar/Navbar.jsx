import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { Brand } from "./ui/Brand";
import { Search } from "./ui/Search";
import { Actions } from "./ui/Actions";
import { UserMenu } from "./ui/UserMenu";
import { Hamburger } from "./ui/Hamburger";
import { cn } from "@/shared/integrations/cn";
import { useModal } from "@/app/modal";
import { useAuthGuard } from "@/app/auth";

export function Navbar({ className, onToggle, onUserMenuClick }) {
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const { open } = useModal();
  const auth = useAuthGuard();

  const handleStartSearch = () => {
    setIsSearching(true);
    setTimeout(() => searchInputRef.current?.focus(), 60);
  };

  const handleStopSearch = () => {
    setIsSearching(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full h-14 bg-app-surface border-b border-app-border",
        "flex items-center justify-between px-2.5 sm:px-4 shrink-0 overflow-hidden",
        className,
      )}
    >
      {/* 1. LEFT ZONE: Hamburger + Brand */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <Hamburger isSearching={isSearching} onClick={onToggle} />
        <Brand />
      </div>

      {/* 2. CENTER ZONE: Smooth Expandable Search */}
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
              className="absolute right-2 p-1 text-content-muted hover:text-content-primary md:hidden"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. RIGHT ZONE: Search Trigger + Actions + Avatar */}
      <div
        className={cn(
          "flex items-center shrink-0 transition-all duration-150",
          isSearching ? "gap-1" : "gap-1.5 sm:gap-2",
        )}
      >
        {/* Mobile Search Button */}
        {!isSearching && (
          <button
            type="button"
            onClick={handleStartSearch}
            aria-label="Open search"
            className="flex md:hidden items-center justify-center size-8 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg"
          >
            <SearchIcon className="size-4" />
          </button>
        )}

        {/* Action icons (+ hides when isSearching is true) */}
        <Actions
          isSearching={isSearching}
          onCreate={() => auth.require(() => open("createPost"))}
        />

        <div className="h-4 w-px bg-app-border mx-0.5" />

        <UserMenu isSearching={isSearching} onClick={onUserMenuClick} />
      </div>
    </header>
  );
}
