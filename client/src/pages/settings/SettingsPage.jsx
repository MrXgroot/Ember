import React, { useState } from "react";
import {
  User,
  Key,
  Shield,
  Bell,
  Palette,
  Camera,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function SettingsPage({ className }) {
  const [activeTab, setActiveTab] = useState("profile");

  // State switches
  const [allowDMs, setAllowDMs] = useState(true);
  const [adultContent, setAdultContent] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account & Security", icon: Key },
    { id: "privacy", label: "Safety & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance & Feed", icon: Palette },
  ];

  return (
    <div className={cn("w-full flex flex-col gap-6 pb-12", className)}>
      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col gap-1 border-b border-app-border pb-4">
        <h1 className="text-xl font-bold tracking-tight text-content-primary">
          User Settings
        </h1>
        <p className="text-xs text-content-secondary">
          Manage your account preferences, profile visibility, and ember
          experience.
        </p>
      </div>

      {/* ─── TOP HORIZONTAL CAPSULE TABS ─── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-app-border/50 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-app-md text-xs font-medium transition-all duration-150 whitespace-nowrap select-none",
                isActive
                  ? "bg-brand-light text-brand-primary font-semibold shadow-surface-sm"
                  : "text-content-secondary hover:text-content-primary hover:bg-app-surface",
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB CONTENT PANELS ─── */}
      <div className="w-full flex flex-col gap-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6 bg-app-surface border border-app-border rounded-app-lg flex flex-col gap-5">
            <h2 className="text-sm font-semibold text-content-primary">
              Profile Identity
            </h2>

            {/* Avatar Row */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-sm font-bold text-brand-primary">
                  SU
                </div>
                <button className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-app-md text-xs font-medium bg-app-bg border border-app-border text-content-primary hover:bg-app-surface transition-colors">
                    Change Avatar
                  </button>
                  <button className="px-3 py-1.5 rounded-app-md text-xs font-medium text-red-400 hover:bg-red-950/20 transition-colors">
                    Remove
                  </button>
                </div>
                <span className="text-[10px] text-content-muted">
                  Recommended 256x256. Max 2MB.
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-content-secondary">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="Sukesh Acharya"
                  className="h-9 px-3 rounded-app-md bg-app-bg border border-app-border text-sm text-content-primary focus:border-brand-primary outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-content-secondary">
                  Username
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue="u/sukesh_acharya"
                  className="h-9 px-3 rounded-app-md bg-app-bg/50 border border-app-border/60 text-sm text-content-muted outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-content-secondary">
                About (Bio)
              </label>
              <textarea
                rows={3}
                defaultValue="Building modern community interfaces on ember."
                className="p-3 rounded-app-lg bg-app-bg border border-app-border text-sm text-content-primary focus:border-brand-primary outline-none resize-none leading-relaxed transition-colors"
              />
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-app-surface border border-app-border rounded-app-lg flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-content-primary">
                Credentials & Auth
              </h2>

              <div className="flex items-center justify-between py-2 border-b border-app-border/40">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-content-primary">
                    Email Address
                  </span>
                  <span className="text-[11px] text-content-secondary">
                    sukesh@domain.com
                  </span>
                </div>
                <button className="px-3 py-1.5 rounded-app-md text-xs font-medium bg-app-bg border border-app-border hover:bg-app-surface transition-colors">
                  Change Email
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-content-primary">
                    Password
                  </span>
                  <span className="text-[11px] text-content-secondary">
                    Last updated 3 months ago
                  </span>
                </div>
                <button className="px-3 py-1.5 rounded-app-md text-xs font-medium bg-app-bg border border-app-border hover:bg-app-surface transition-colors">
                  Change Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-5 bg-red-950/10 border border-red-950/30 rounded-app-lg flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-red-400">
                  Delete Account
                </span>
                <span className="text-[11px] text-content-muted">
                  Permanently remove your account profile, posts, and karma.
                </span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-app-md text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Safety & Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="p-6 bg-app-surface border border-app-border rounded-app-lg flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-content-primary">
              Safety & Filtering
            </h2>

            <div className="flex items-center justify-between py-2 border-b border-app-border/40">
              <div className="flex flex-col gap-0.5 max-w-md">
                <span className="text-xs font-medium text-content-primary">
                  Direct Messages
                </span>
                <span className="text-[11px] text-content-secondary">
                  Allow members of communities you share to send direct
                  messages.
                </span>
              </div>
              <button
                onClick={() => setAllowDMs(!allowDMs)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative p-0.5",
                  allowDMs
                    ? "bg-brand-primary"
                    : "bg-app-bg border border-app-border",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    allowDMs ? "translate-x-5" : "translate-x-0 bg-zinc-400",
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col gap-0.5 max-w-md">
                <span className="text-xs font-medium text-content-primary">
                  Mature (18+) Content
                </span>
                <span className="text-[11px] text-content-secondary">
                  Include sensitive media and discussions in search results and
                  feeds.
                </span>
              </div>
              <button
                onClick={() => setAdultContent(!adultContent)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative p-0.5",
                  adultContent
                    ? "bg-brand-primary"
                    : "bg-app-bg border border-app-border",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    adultContent
                      ? "translate-x-5"
                      : "translate-x-0 bg-zinc-400",
                  )}
                />
              </button>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="p-6 bg-app-surface border border-app-border rounded-app-lg flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-content-primary">
              Feed Layout & Controls
            </h2>

            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col gap-0.5 max-w-md">
                <span className="text-xs font-medium text-content-primary">
                  Compact View
                </span>
                <span className="text-[11px] text-content-secondary">
                  Shrink post cards to fit more content on screen
                  simultaneously.
                </span>
              </div>
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative p-0.5",
                  compactMode
                    ? "bg-brand-primary"
                    : "bg-app-bg border border-app-border",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    compactMode ? "translate-x-5" : "translate-x-0 bg-zinc-400",
                  )}
                />
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="p-6 bg-app-surface border border-app-border rounded-app-lg flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-content-primary">
              Inbox & Alerts
            </h2>
            <p className="text-xs text-content-secondary">
              Activity digests and notification alerts are coming soon.
            </p>
          </div>
        )}
      </div>

      {/* ─── STICKY / FLOATING SAVE FOOTER ─── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-app-border">
        <button className="px-4 h-9 rounded-app-md text-xs font-medium text-content-secondary hover:text-content-primary transition-colors">
          Discard Changes
        </button>
        <button className="flex items-center gap-2 px-5 h-9 rounded-app-md text-xs font-semibold bg-brand-primary text-white hover:bg-brand-hover active:scale-95 shadow-surface-sm transition-all">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
