import axios from "@/shared/integrations/api";
export async function leaveCommunity(communityId) {
  const response = await axios.post(`/communities/${communityId}/leave`);

  return response.data.data.community;
}
