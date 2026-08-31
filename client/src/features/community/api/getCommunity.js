import axios from "@/shared/integrations/api";
export async function getCommunity(slug) {
  const response = await axios.get(`/communities/${slug}`);
  return response.data.data.community;
}
