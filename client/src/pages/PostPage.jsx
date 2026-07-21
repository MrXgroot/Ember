import React from "react";
import { PostDetails, usePostDetailsController } from "@/features/post";
import PageLayout from "@/app/layouts/page/PageLayout";
import { CommentComposer } from "@/features/comment/CommentComposer/CommentComposer";
import { CommentList } from "@/features/comment/CommentList/CommentList";
export const PostPage = () => {
  const postDetailsController = usePostDetailsController();
  return (
    <div>
      <PageLayout sidebar={<PostDetails controller={postDetailsController} />}>
        <PostDetails controller={postDetailsController} />
        <CommentComposer />
        <CommentList />
      </PageLayout>
    </div>
  );
};
