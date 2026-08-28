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
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleStopSearch = () => {
    setIsSearching(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full h-14 bg-app-surface/95 backdrop-blur-md border-b border-app-border",
        "flex items-center justify-between px-3 sm:px-4 shrink-0 overflow-hidden",
        className,
      )}
    >
      {/* 1. LEFT ZONE: Hamburger (Hides when searching) & Brand (Always visible) */}
      <motion.div layout className="flex items-center gap-1 sm:gap-2 shrink-0">
        <AnimatePresence initial={false}>
          {!isSearching && (
            <motion.div
              key="hamburger-wrapper"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Hamburger onClick={onToggle} />
            </motion.div>
          )}
        </AnimatePresence>

        <Brand />
      </motion.div>

      {/* 2. CENTER ZONE: Dynamic Expanding Search Bar */}
      <motion.div
        layout
        className={cn(
          "flex items-center transition-all duration-300",
          isSearching
            ? "flex-1 mx-2"
            : "hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4",
        )}
      >
        <div className="relative w-full flex items-center">
          <Search ref={searchInputRef} />

          {/* Close button that appears when mobile search is active */}
          {isSearching && (
            <button
              type="button"
              onClick={handleStopSearch}
              aria-label="Cancel search"
              className="absolute right-2 p-1 text-content-muted hover:text-content-primary rounded-app-md md:hidden"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* 3. RIGHT ZONE: Actions & Profile (Collapses tightly when searching) */}
      <motion.div
        layout
        className={cn(
          "flex items-center shrink-0 transition-all duration-200",
          isSearching ? "gap-1 scale-95 origin-right" : "gap-1.5 sm:gap-3",
        )}
      >
        {/* Trigger icon for mobile when search is NOT active */}
        {!isSearching && (
          <button
            type="button"
            onClick={handleStartSearch}
            aria-label="Open search"
            className="flex md:hidden items-center justify-center size-8 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        )}

        <Actions
          isSearching={isSearching}
          onCreate={() => auth.require(() => open("createPost"))}
        />

        <div className="h-4 w-px bg-app-border mx-0.5" />

        <UserMenu isSearching={isSearching} onClick={onUserMenuClick} />
      </motion.div>
    </header>
  );
}
