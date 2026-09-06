import { Feed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";

export function AllPage() {
  return (
    <PageLayout>
      <Feed
        options={{
          sort: "newest",
        }}
      />
    </PageLayout>
  );
}
