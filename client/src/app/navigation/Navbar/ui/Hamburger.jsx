import { Menu } from "lucide-react";

import { cn } from "@/shared/integrations/cn";

export function Hamburger({ className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center",

        "size-10 rounded-lg",

        "hover:bg-app-hover",

        "transition-colors",

        "focus:outline-none",

        className,
      )}
    >
      <Menu className="size-5" />
    </button>
  );
}
