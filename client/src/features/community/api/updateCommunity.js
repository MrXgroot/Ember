import axios from "@/shared/integrations/api";
export async function updateCommunity({ communityId, communityData }) {
  const response = await axios.patch(
    `/communities/${communityId}`,
    communityData,
  );

  return response.data.data.community;
}
