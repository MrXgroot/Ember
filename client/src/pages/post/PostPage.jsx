import PageLayout from "@/app/layouts/page/PageLayout";
import { PostLayout } from "./layout";
import { useParams } from "react-router-dom";

import { PostDetails, usePostDetailsController } from "@/features/post";
import {
  CommentComposer,
  useCommentComposer,
} from "@/features/comment/CommentComposer";
import {
  CommentList,
  useCommentListController,
} from "@/features/comment/CommentList";
// import { CommentComposer } from "@/features/comment/CommentComposer";
// import { CommentList } from "@/features/comment/CommentList";

export function PostPage() {
  const { postId } = useParams();
  console.log(postId);
  const postDetailsController = usePostDetailsController({ postId });
  const composerController = useCommentComposer({ postId });
  const commentListController = useCommentListController({ postId });
  return (
    <PageLayout>
      <PostLayout>
        <PostLayout.Post>
          <PostDetails controller={postDetailsController} />
        </PostLayout.Post>

        <PostLayout.Composer>
          <CommentComposer controller={composerController} />
        </PostLayout.Composer>

        <PostLayout.Comments>
          <CommentList controller={commentListController} />
        </PostLayout.Comments>
      </PostLayout>
    </PageLayout>
  );
}
