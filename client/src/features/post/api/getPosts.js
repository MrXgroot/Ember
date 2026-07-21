import api from "@/shared/integrations/api";

export async function getPosts(filters = {}, options = {}) {
  const response = await api.get("/posts", {
    params: {
      ...filters,
      ...options,
    },
  });
  console.log(response.data);
  return response.data;
}
