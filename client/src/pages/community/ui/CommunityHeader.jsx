import React, { useState } from "react";
import {
  Users,
  Check,
  Plus,
  Trash2,
  MoreVertical,
  Loader2,
  Lock,
  Globe,
  Share2,
} from "lucide-react";

export function CommunityHeader({
  community,
  isMember,
  isOwner,
  onJoin,
  onLeave,
  onDelete,
  isJoining,
  isLeaving,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const name = community?.name || "Untitled Community";
  const avatar = community?.avatar || community?.icon;
  const banner = community?.banner || community?.coverImage;
  const memberCount = community?.memberCount ?? community?.members?.length ?? 1;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="w-full bg-app-surface border-b border-app-border">
      {/* Banner Cover */}
      <div className="relative h-40 sm:h-60 w-full bg-linear-to-r from-slate-800 via-indigo-950 to-neutral-900 overflow-hidden">
        {banner ? (
          <img src={banner} alt={name} className="size-full object-cover" />
        ) : (
          <div className="size-full opacity-30 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Main Profile Info & Action Buttons */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-20 relative z-10">
          <div className="flex items-end gap-3.5 sm:gap-5">
            <div className="size-24 sm:size-32 rounded-3xl border-4 border-app-surface bg-app-bg shadow-xl overflow-hidden shrink-0 flex items-center justify-center font-black text-3xl sm:text-4xl text-brand-primary select-none">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="size-full object-cover"
                />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>

            <div className="mb-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-extrabold text-content-primary tracking-tight truncate">
                  {name}
                </h1>
                {community?.isPrivate ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Lock className="size-3" /> Private
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Globe className="size-3" /> Public
                  </span>
                )}
              </div>

              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-content-muted mt-1 font-medium">
                <Users className="size-4" />
                <span>
                  {memberCount.toLocaleString()}{" "}
                  {memberCount === 1 ? "member" : "members"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end mt-2 sm:mt-0">
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-app-border bg-app-bg hover:bg-app-surface text-content-secondary hover:text-content-primary transition-all cursor-pointer"
            >
              <Share2 className="size-4" />
            </button>

            {isMember ? (
              <button
                type="button"
                onClick={onLeave}
                disabled={isLeaving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-app-border bg-app-bg hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-500 text-content-primary transition-all cursor-pointer"
              >
                {isLeaving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4 text-emerald-500" />
                )}
                <span>Joined</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onJoin}
                disabled={isJoining}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md shadow-brand-primary/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isJoining ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                <span>Join</span>
              </button>
            )}

            {isOwner && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="p-2.5 rounded-xl border border-app-border bg-app-bg hover:bg-app-surface text-content-secondary hover:text-content-primary transition-all cursor-pointer"
                >
                  <MoreVertical className="size-4" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-app-surface border border-app-border shadow-2xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onDelete();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-sm text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer font-medium"
                    >
                      <Trash2 className="size-4" />
                      <span>Delete Community</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
