import React from "react";

export function CommunityOwner({ owner }) {
  if (!owner) return null;

  const displayName = owner.displayName || owner.username || "Admin";
  const avatar = owner.avatar;

  return (
    <div className="rounded-2xl border border-app-border bg-app-surface p-4 flex items-center gap-3">
      <div className="size-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border border-brand-primary/20">
        {avatar ? (
          <img
            src={avatar}
            alt={displayName}
            className="size-full object-cover"
          />
        ) : (
          displayName.charAt(0).toUpperCase()
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-content-primary truncate leading-tight">
          {displayName}
        </p>
        <p className="text-xs text-content-muted leading-tight mt-0.5">
          Community Owner
        </p>
      </div>
    </div>
  );
}
