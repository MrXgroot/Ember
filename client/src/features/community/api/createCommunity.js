import axios from "@/shared/lib/axios";

export async function createCommunity(communityData) {
  const response = await axios.post("/communities", communityData);

  return response.data.data.community;
}
