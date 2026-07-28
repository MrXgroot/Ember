import axios from "@/shared/integrations/api";
export async function deleteCommunity(communityId) {
  await axios.delete(`/communities/${communityId}`);
}
