import axios from "@/shared/lib/axios";

export async function deleteCommunity(communityId) {
  await axios.delete(`/communities/${communityId}`);
}
