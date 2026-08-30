import { useParams } from "react-router-dom";
import { Feed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";
import { CommunityHeader } from "@/features/community/Header/CommunityHeader";
export function CommunityPage() {
  const { communityId } = useParams();

  return (
    <PageLayout>
      <CommunityHeader />
      <Feed
        filters={{
          community: communityId,
        }}
      />
    </PageLayout>
  );
}
