import { Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages";
import { PostPage } from "@/pages";
import { CommunityPage } from "@/pages/community/CommunityPage";

import { PopularPage } from "@/pages/popular";

import { ExploreCommunitiesPage } from "@/pages/explore";
import { ExploreUsersPage } from "@/pages/explore/users";

import { SearchPage } from "@/pages/search";
import { NotificationsPage } from "@/pages/notification";
import { SettingsPage } from "@/pages/settings";

import { InboxPage } from "@/pages/message/inbox";
import { ChatPage } from "@/pages/message/chat";
function PublicRoutes() {
  return (
    <Routes>
      {/* ==================== HOME ==================== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<PopularPage />} />

      {/* ==================== POSTS ==================== */}
      <Route path="/posts/:postId" element={<PostPage />} />

      {/* ==================== COMMUNITIES ==================== */}
      <Route path="/c/:communityId" element={<CommunityPage />} />

      {/* ==================== EXPLORE ==================== */}
      <Route path="/communities" element={<ExploreCommunitiesPage />} />
      <Route path="/explore/users" element={<ExploreUsersPage />} />

      {/* ==================== SEARCH ==================== */}
      <Route path="/search" element={<SearchPage />} />

      {/* ==================== USER ==================== */}
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* ==================== USER ==================== */}
      <Route path="/messages" element={<InboxPage />} />
      <Route path="/messages/:userId" element={<ChatPage />} />
    </Routes>
  );
}

export default PublicRoutes;
