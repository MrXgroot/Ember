import { useCommentFeedController } from "./controller";

import { CommentList, CommentEmptyState, CommentFeedLoader } from "./ui";

export function CommentFeed() {
  const controller = useCommentFeedController();

  if (controller.ui.isPending) {
    return <CommentFeedLoader />;
  }

  if (controller.ui.isEmpty) {
    return <CommentEmptyState />;
  }

  return (
    <CommentList>
      {controller.data.comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </CommentList>
  );
}
