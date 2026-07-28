import axios from "@/shared/integrations/api";
export async function createCommunity({ communityData }) {
  console.log(communityData);
  const response = await axios.post("/communities", communityData);

  return response.data.data.community;
}
