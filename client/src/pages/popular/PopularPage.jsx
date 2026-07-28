import { Feed, useFeed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";
export function PopularPage() {
  const feed = useFeed({
    options: {
      sort: "popular",
    },
  });

  return (
    <PageLayout>
      <Feed controller={feed} />
    </PageLayout>
  );
}
