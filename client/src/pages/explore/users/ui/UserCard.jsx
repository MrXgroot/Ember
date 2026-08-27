import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Clock } from "lucide-react";

function formatLastSeen(dateString) {
  if (!dateString) return "Long time ago";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function UserCard({ user }) {
  const userId = user._id || user.id;
  const displayName = user.displayName || user.username || "Anonymous";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="p-4 bg-app-surface border border-app-border rounded-app-lg flex flex-col justify-between gap-3.5 transition-all duration-150 hover:border-zinc-700/60 shadow-surface-sm group">
      {/* Header: Avatar, Name, Status */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="relative shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className="w-12 h-12 rounded-full object-cover border border-app-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-sm font-bold text-brand-primary">
              {initials}
            </div>
          )}

          {user.isOnline ? (
            <span
              title="Online"
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-app-surface shadow-sm"
            />
          ) : (
            <span
              title={`Offline (Last seen ${formatLastSeen(user.lastOnlineAt)})`}
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-zinc-600 ring-2 ring-app-surface"
            />
          )}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-content-primary truncate group-hover:text-brand-primary transition-colors">
              {displayName}
            </span>
          </div>

          <span className="text-[11px] text-content-muted truncate">
            {user.username ? `u/${user.username}` : "Member"}
          </span>

          <div className="flex items-center gap-1 mt-1 text-[10px]">
            {user.isOnline ? (
              <span className="text-emerald-400 font-medium">Active now</span>
            ) : (
              <span className="text-content-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-content-muted shrink-0" />
                <span>Seen {formatLastSeen(user.lastOnlineAt)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio ? (
        <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed bg-app-bg/50 p-2.5 rounded-app-md border border-app-border/40">
          {user.bio}
        </p>
      ) : (
        <p className="text-[11px] text-content-muted italic">
          No bio provided.
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-app-border/40">
        <Link
          to={`/messages/${userId}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-app-md text-xs font-semibold bg-brand-primary text-white hover:bg-brand-hover active:scale-95 transition-all shadow-surface-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Message</span>
        </Link>

        <Link
          to={`/user/${user.username || userId}`}
          className="px-3 h-8 rounded-app-md text-xs font-medium bg-app-bg border border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface transition-colors flex items-center justify-center"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
