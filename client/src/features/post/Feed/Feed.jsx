import { usePostsQuery, useVote } from "../hooks";
import { LoadingState, ErrorState, EmptyState, PostList } from "./ui";
// import { PostCard } from "../PostCard";
import { PostCard } from "./ui/PostCard";

export function Feed({ filters, options }) {
  const postsQuery = usePostsQuery({
    filters,
    options,
  });

  const vote = useVote();

  const posts = postsQuery.data ?? [];
  console.log(posts);
  if (postsQuery.isLoading) {
    return <LoadingState />;
  }

  if (postsQuery.isError) {
    return <ErrorState error={postsQuery.error} />;
  }

  if (!posts.length) {
    return <EmptyState />;
  }

  return (
    <PostList>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onUpvote={() =>
            vote.mutate({
              postId: post._id,
              type: "upvote",
            })
          }
          onDownvote={() =>
            vote.mutate({
              postId: post._id,
              type: "downvote",
            })
          }
        />
      ))}
    </PostList>
  );
}
