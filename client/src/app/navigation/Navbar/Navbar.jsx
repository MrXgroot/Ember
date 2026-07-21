import { Brand, Search, Actions, UserMenu, Hamburger } from "./ui";

import { cn } from "@/shared/integrations/cn";

import { useModal } from "@/app/modal";
import { useAuthGuard } from "@/app/auth";

const BREAKPOINTS = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
};

export function Navbar({ className, hamburgerBreakpoint = "xl", onToggle }) {
  const { open } = useModal();
  const auth = useAuthGuard();

  return (
    <header
      className={cn(
        "w-full h-14 flex items-center justify-between px-4 shrink-0",

        "bg-app-surface border-b border-app-border",

        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Hamburger
          className={BREAKPOINTS[hamburgerBreakpoint]}
          onClick={onToggle}
        />

        <Brand />
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <Search />
      </div>

      <div className="flex items-center gap-3">
        <Actions onCreate={() => auth.require(() => open("createPost"))} />

        <UserMenu className="rounded-full" />
      </div>
    </header>
  );
}
