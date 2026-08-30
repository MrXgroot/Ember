import React from "react";
import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import { useAuth, useAuthGuard } from "@/app/auth";
import { useJoinCommunity } from "@/features/community/hooks";
import { cn } from "@/shared/integrations/cn";

export function CommunityCard({ community, className }) {
  const { user } = useAuth();
  const auth = useAuthGuard();
  const joinMutation = useJoinCommunity?.() || {
    mutate: () => {},
    isPending: false,
  };

  const isMember = community.members?.includes(user?._id);
  const initials = community.name?.slice(0, 2).toUpperCase() || "C";

  const handleJoinToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    auth.require(() => {
      joinMutation.mutate({ communityId: community._id });
    });
  };

  return (
    <NavLink
      to={`/c/${community.name || community.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-app-lg bg-app-surface/30 border border-app-border",
        "hover:border-app-border-hover hover:bg-app-surface/60 transition-all duration-200 overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        {/* 1. Banner */}
        <div className="h-20 w-full bg-gradient-to-r from-brand-primary/20 via-app-surface to-brand-light/10 relative overflow-hidden border-b border-app-border/40">
          {community.banner ? (
            <img
              src={community.banner}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px]" />
          )}
        </div>

        {/* 2. Floating Avatar + Action Button (Pinned to the banner boundary line) */}
        <div className="absolute top-20 left-0 right-0 -translate-y-1/2 px-4 flex items-center justify-between pointer-events-none z-10">
          <div className="w-12 h-12 rounded-full bg-app-bg border-2 border-app-border overflow-hidden flex items-center justify-center shrink-0 shadow-md pointer-events-auto">
            {community.avatar ? (
              <img
                src={community.avatar}
                alt={community.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-content-primary">
                {initials}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleJoinToggle}
            disabled={joinMutation.isPending}
            className={cn(
              "pointer-events-auto px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-150",
              isMember
                ? "bg-app-bg border border-app-border text-content-secondary hover:text-red-400 hover:border-red-500/30"
                : "bg-brand-primary text-app-bg hover:opacity-90",
            )}
          >
            {isMember ? "Joined" : "Join"}
          </button>
        </div>

        {/* 3. Text Body with clearance for the floating avatar */}
        <div className="pt-9 px-4 pb-4 flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-content-primary group-hover:text-brand-hover transition-colors truncate">
            c/{community.name}
          </h3>

          <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed min-h-[2rem]">
            {community.description ||
              "No description provided for this community."}
          </p>
        </div>
      </div>

      {/* 4. Footer Meta */}
      <div className="px-4 py-2.5 bg-app-bg/40 border-t border-app-border/40 flex items-center justify-between text-[11px] text-content-muted">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>
            {community.membersCount || community.members?.length || 0} members
          </span>
        </div>

        {community.owner && (
          <span className="truncate max-w-[110px]">
            by{" "}
            {community.owner.displayName ||
              community.owner.username ||
              "creator"}
          </span>
        )}
      </div>
    </NavLink>
  );
}
