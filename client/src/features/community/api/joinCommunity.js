import axios from "@/shared/integrations/api";
export async function joinCommunity({ communityId }) {
  const response = await axios.post(`/communities/${communityId}/join`);

  return response.data.data.community;
}
