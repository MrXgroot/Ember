import { Feed, useFeed } from "@/features/post/Feed";
import { HomeSidebar } from "./HomeSidebar";
import PageLayout from "@/app/layouts/page/PageLayout";
export function HomePage() {
  const controller = useFeed();

  return (
    <PageLayout sidebar={<HomeSidebar />}>
      <Feed controller={controller} />
    </PageLayout>
  );
}
