import { useParams } from "react-router-dom";

function CommunityPage() {
  const { communityId } = useParams();

  return (
    <div>
      <h1>Community Page</h1>
      <p>Community ID: {communityId}</p>
    </div>
  );
}

export default CommunityPage;
