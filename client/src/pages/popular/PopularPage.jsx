import { Feed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";
export function PopularPage() {
  return (
    <PageLayout>
      <Feed
        options={{
          sort: "popular",
        }}
      />
    </PageLayout>
  );
}
