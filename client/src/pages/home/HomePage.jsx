import { Feed, useFeed } from "@/features/post/Feed";
import { HomeSidebar } from "./HomeSidebar";
import PageLayout from "@/app/layouts/page/PageLayout";
import { socket } from "@/shared/integrations/socket/socket";
export function HomePage() {
  const controller = useFeed();

  return (
    <PageLayout sidebar={<HomeSidebar />}>
      <Feed controller={controller} />
    </PageLayout>
  );
}
