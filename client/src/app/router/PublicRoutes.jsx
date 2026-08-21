import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages";
import { PostPage } from "@/pages";
import { CommunityPage } from "@/pages/community/CommunityPage";
import { PopularPage } from "@/pages/popular";
import { ExploreCommunitiesPage } from "@/pages/explore";
import { SettingsPage } from "@/pages/settings";
import { NotificationsPage } from "@/pages/notification";
import { MessagesPage } from "@/pages/messages";
import { SearchPage } from "@/pages/search";
function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/posts/:postId" element={<PostPage />} />
      <Route path="/c/:communityId" element={<CommunityPage />} />
      <Route path="/communities" element={<ExploreCommunitiesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default PublicRoutes;
