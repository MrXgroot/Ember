import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateAction() {
  return (
    <>
      {/* Desktop / tablet */}
      <Link
        to="/post/create"
        className="
          hidden sm:flex
          items-center justify-center gap-1.5
          h-8 sm:h-9
          px-2.5 sm:px-3
          rounded-app-md
          bg-content-primary
          text-app-bg
          text-xs
          font-semibold
          tracking-wide
          shadow-surface-sm
          hover:opacity-90
          active:scale-95
          transition-all
          select-none
          shrink-0
        "
      >
        <Plus className="size-4 stroke-[2.5]" />
        <span>Create</span>
      </Link>

      {/* Mobile */}
      <Link
        to="/post/create"
        aria-label="Create post"
        className="
          flex sm:hidden
          fixed bottom-5 right-5 z-50
          items-center justify-center
          size-12
          rounded-full
          bg-content-primary
          text-app-bg
          shadow-lg
          hover:opacity-90
          active:scale-95
          transition-all
        "
      >
        <Plus className="size-5 stroke-[2.5]" />
      </Link>
    </>
  );
}
