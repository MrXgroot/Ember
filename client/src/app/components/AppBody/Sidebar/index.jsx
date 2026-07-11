import React, { useState } from "react";
import {
  Home,
  Users,
  Flame,
  Star,
  Settings,
  ChevronDown,
  Compass,
  Plus,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  // Simple state to keep track of the active route for styling
  const [activeItem, setActiveItem] = useState("Home");
  // State for toggling communities submenu
  const [communitiesExpanded, setCommunitiesExpanded] = useState(true);

  // Mock list for your custom communities section
  const favoriteCommunities = [
    { name: "e/reactjs", sparks: "4.2k active" },
    { name: "e/tailwind_art", sparks: "890 active" },
    { name: "e/indie_hackers", sparks: "1.5k active" },
  ];

  const mainNavigation = [
    { name: "Home", icon: Home },
    { name: "Popular", icon: Flame, badge: "HOT" },
    { name: "Saved", icon: Star },
  ];

  return (
    <aside className="w-64 h-full bg-slate-950 border-r border-white/5 flex flex-col justify-between py-6 px-4 font-sans select-none">
      {/* Upper Navigation Area */}
      <div className="space-y-6 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {/* Main Navigation Group */}
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500/10 to-red-500/5 text-orange-400 border-l-2 border-orange-500 pl-2.5 shadow-[inset_0_1px_12px_rgba(239,68,68,0.05)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-orange-400" : "text-slate-500 group-hover:text-amber-400"}`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <hr className="border-white/5" />

        {/* Communities Collapsible Drawer Section */}
        <div className="space-y-2">
          <div
            onClick={() => setCommunitiesExpanded(!communitiesExpanded)}
            className="flex items-center justify-between px-3 text-xs font-bold text-slate-500 hover:text-slate-300 cursor-pointer uppercase tracking-wider group"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
              <span>Communities</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${communitiesExpanded ? "" : "-rotate-90"}`}
            />
          </div>

          {communitiesExpanded && (
            <div className="space-y-1 mt-2 pl-1 animate__animated animate__fadeIn animate__faster">
              {/* Quick Create Community Trigger */}
              <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-500 hover:text-orange-400 border border-dashed border-white/5 hover:border-orange-500/30 rounded-xl transition-all">
                <Plus className="h-4 w-4" />
                <span>Create a Community</span>
              </button>

              {/* Populated Community List */}
              {favoriteCommunities.map((community) => (
                <button
                  key={community.name}
                  onClick={() => setActiveItem(community.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-sm ${
                    activeItem === community.name
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm shadow-orange-950">
                      e/
                    </div>
                    <span className="truncate">{community.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 shrink-0 font-mono">
                    {community.sparks}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Settings Subsection at Bottom */}
      <div className="mt-auto pt-4 border-t border-white/5 space-y-1">
        <button
          onClick={() => setActiveItem("Settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            activeItem === "Settings"
              ? "bg-slate-900 text-orange-400"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Settings className="h-5 w-5 text-slate-500" />
          <span>Settings</span>
        </button>

        {/* Branding Footer note */}
        <div className="px-3 pt-3 text-[11px] text-slate-600 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-orange-500/50" />
          <span>Ember v1.0.2</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
