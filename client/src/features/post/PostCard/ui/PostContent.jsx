import React from "react";
import { NavLink } from "react-router-dom";

export function PostContent({ postId, title, description }) {
  return (
    <div className="flex flex-col gap-1.5">
      <NavLink to={`/post/${postId}`}>
        <h2 className="text-base sm:text-lg font-semibold text-content-primary hover:text-brand-hover transition-colors leading-snug">
          {title}
        </h2>
      </NavLink>

      {description && description.trim().length > 0 && (
        <p className="text-sm text-content-secondary leading-relaxed line-clamp-3">
          {description}
        </p>
      )}
    </div>
  );
}
