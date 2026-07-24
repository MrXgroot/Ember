import axios from "@/shared/lib/axios";

export async function joinCommunity(communityId) {
  const response = await axios.post(`/communities/${communityId}/join`);

  return response.data.data.community;
}
