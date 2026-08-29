import { Feed } from "@/features/post/Feed";
import { HomeSidebar } from "./HomeSidebar";
import PageLayout from "@/app/layouts/page/PageLayout";
export function HomePage() {
  return (
    <PageLayout sidebar={<HomeSidebar />}>
      <Feed />
    </PageLayout>
  );
}
