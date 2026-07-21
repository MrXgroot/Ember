import { Feed, useFeed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";
export function HomePage() {
  const controller = useFeed();
  return (
    <>
      <PageLayout sidebar={<Feed controller={controller} />}>
        <Feed controller={controller} />
      </PageLayout>
    </>
  );
}
