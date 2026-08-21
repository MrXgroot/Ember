import { PostCard } from "@/features/post/PostCard";
import { CommunityResultCard } from "./CommunityResultCard";
import { UserResultCard } from "./UserResultCard";
import { SearchLoading } from "./SearchLoading";
import { SearchError } from "./SearchError";
import { SearchEmpty } from "./SearchEmpty";
import { cn } from "@/shared/integrations/cn";

export function SearchResults({ type, controller, className }) {
  const {
    posts = [],
    communities = [],
    people = [],
    isPending,
    isError,
    refetch,
  } = controller;

  if (isPending) {
    return <SearchLoading />;
  }

  if (isError) {
    return <SearchError onRetry={refetch} />;
  }

  const hasNoResults =
    (type === "all" &&
      posts.length === 0 &&
      communities.length === 0 &&
      people.length === 0) ||
    (type === "posts" && posts.length === 0) ||
    (type === "communities" && communities.length === 0) ||
    (type === "people" && people.length === 0);

  if (hasNoResults) {
    return <SearchEmpty />;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Communities */}
      {(type === "all" || type === "communities") && communities.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <span className="px-1 text-[10px] font-semibold tracking-widest text-content-muted uppercase">
            Communities
          </span>

          <div className="flex flex-col gap-2">
            {communities.map((community) => (
              <CommunityResultCard key={community._id} community={community} />
            ))}
          </div>
        </section>
      )}

      {/* People */}
      {(type === "all" || type === "people") && people.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <span className="px-1 text-[10px] font-semibold tracking-widest text-content-muted uppercase">
            People
          </span>

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {people.map((user) => (
              <UserResultCard key={user._id} user={user} />
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      {(type === "all" || type === "posts") && posts.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <span className="px-1 text-[10px] font-semibold tracking-widest text-content-muted uppercase">
            Posts
          </span>

          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
