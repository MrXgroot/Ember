import axios from "@/shared/lib/axios";

export async function getCommunities(params = {}) {
  const response = await axios.get("/communities", {
    params,
  });

  return response.data.data.communities;
}
