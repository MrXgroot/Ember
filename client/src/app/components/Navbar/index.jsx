import React from "react";
import {
  Sparkles,
  Search,
  Plus,
  Bell,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

// Using dummy image for user avatar. Substitute with user.avatar_url or similar.
const userAvatarUrl =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=480&auto=format&fit=facearea&ixlib=rb-4.0.3";

function Navbar() {
  return (
    <nav className="h-16 w-full bg-slate-950/90 backdrop-blur-sm border-b border-white/5 px-6 flex items-center shrink-0 z-50 sticky top-0 font-sans shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      {/* 1. The Logo Section (Ember) */}
      <div className="flex items-center gap-2 group cursor-pointer mr-6">
        <div className="relative">
          <Sparkles className="h-7 w-7 text-amber-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out" />
          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
        </div>
        <span className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors tracking-tight">
          Ember<span className="text-orange-500">.</span>
        </span>
      </div>

      {/* 2. The Search Bar Section (Center) */}
      <div className="flex-1 max-w-2xl px-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
          </div>
          <input
            type="search"
            placeholder="Search Ember for posts, sparks, or people..."
            className="w-full bg-slate-900 border border-white/5 text-slate-100 rounded-full h-10 pl-11 pr-4 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-slate-900/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 3. The Actions Section (Right Side) */}
      <div className="flex items-center gap-3">
        {/* + Create Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-red-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-orange-950/40 hover:scale-105 group">
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>Create Spark</span>
        </button>

        {/* Secondary Interaction Icons (Hidden on Mobile) */}
        <div className="flex items-center gap-1.5 sm:flex">
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
            <MessageSquare className="h-5 w-5" />
          </button>
          <div className="relative">
            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
              <Bell className="h-5 w-5" />
            </button>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-slate-950"></span>
          </div>
        </div>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-2 pl-3 border-l border-white/10 group cursor-pointer py-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
          <div className="relative shrink-0">
            <img
              src={userAvatarUrl}
              alt="User profile"
              className="h-9 w-9 rounded-full ring-2 ring-orange-500/30 group-hover:ring-orange-400 transition-all"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </div>
          <div className="hidden lg:block leading-tight pr-1">
            <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
              Alex Rivera
            </p>
            <p className="text-xs text-slate-500">12k Karma</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-slate-200 transition-colors hidden sm:block" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
