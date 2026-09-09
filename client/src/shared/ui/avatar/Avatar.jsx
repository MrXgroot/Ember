import React, { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Avatar({ src, name = "User", size = "md", className }) {
  const [hasError, setHasError] = useState(false);

  const sizes = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
    xl: "size-12",
  };

  const iconSizes = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
    xl: "size-6",
  };

  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        sizes[size],
        "shrink-0 overflow-hidden rounded-full",
        "border border-app-border",
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="size-full object-cover"
        />
      ) : (
        <div
          className="
            size-full
            flex items-center justify-center
            bg-brand-light
            text-brand-hover
            font-semibold
          "
          aria-label={name}
        >
          {initials || <User className={iconSizes[size]} />}
        </div>
      )}
    </div>
  );
}
