import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages";
import { PostPage } from "@/pages";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:postId" element={<PostPage />} />
    </Routes>
  );
}

export default PublicRoutes;
