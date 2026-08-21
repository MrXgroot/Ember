import axios from "@/shared/integrations/api";

export async function getCommunities({ filters = {}, options = {} } = {}) {
  const params = {
    ...filters,
    ...options,
  };
  console.log("calling");

  const response = await axios.get("/communities", {
    params,
  });
  return response.data.data.communities;
}
