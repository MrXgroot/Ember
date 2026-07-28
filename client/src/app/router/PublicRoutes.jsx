import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages";
import { PostPage } from "@/pages";
import { CommunityPage } from "@/pages/community/CommunityPage";
import { PopularPage } from "@/pages/popular";
import { ExploreCommunitiesPage } from "@/pages/explore";
function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/posts/:postId" element={<PostPage />} />
      <Route path="/c/:communityId" element={<CommunityPage />} />
      <Route path="/communities" element={<ExploreCommunitiesPage />} />
    </Routes>
  );
}

export default PublicRoutes;
