import React, { forwardRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { cn } from "@/shared/integrations/cn";

export const Search = forwardRef(function Search({ className }, ref) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  function handleChange(e) {
    const value = e.target.value;
    setSearchParams(
      (params) => {
        if (value.trim()) params.set("q", value);
        else params.delete("q");
        return params;
      },
      { replace: true },
    );
  }

  function handleFocus() {
    if (window.location.pathname !== "/search") {
      navigate("/search");
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-content-muted">
        <SearchIcon className="w-4 h-4" />
      </div>
      <input
        ref={ref}
        type="text"
        value={query}
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder="Search..."
        className={cn(
          "w-full h-8 sm:h-9 pl-9 pr-8 rounded-app-md text-sm outline-none transition-all",
          "bg-app-bg text-content-primary placeholder:text-content-muted",
          "border border-app-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20",
        )}
      />
    </div>
  );
});
