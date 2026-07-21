import { LoadingState, ErrorState, EmptyState, PostList } from "./ui";
import { PostCard } from "../PostCard";
export function Feed({ controller }) {
  if (controller.ui.showLoader) {
    return <LoadingState />;
  }

  if (controller.ui.showError) {
    return <ErrorState error={controller.state.error} />;
  }

  if (controller.ui.showEmpty) {
    return <EmptyState />;
  }

  return (
    <PostList>
      {controller.data.posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onUpvote={() => controller.actions.upvote(post._id)}
          onDownvote={() => controller.actions.downvote(post._id)}
        />
      ))}
    </PostList>
  );
}
