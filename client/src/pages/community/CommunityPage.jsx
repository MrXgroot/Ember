import { useParams } from "react-router-dom";
import { Feed, useFeed } from "@/features/post/Feed";
import PageLayout from "@/app/layouts/page/PageLayout";
import { CommunityHeader } from "@/features/community/Header/CommunityHeader";
export function CommunityPage() {
  const { communityId } = useParams();

  const controller = useFeed({
    filters: {
      community: communityId,
    },
  });
  console.log(controller);
  return (
    <PageLayout>
      <CommunityHeader />
      <Feed controller={controller} />
    </PageLayout>
  );
}
