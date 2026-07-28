import api from "@/shared/integrations/api";
export async function getPosts(request = {}) {
  const { filters = {}, options = {} } = request;
  console.log(request, "is");
  const response = await api.get("/posts", {
    params: {
      ...filters,
      ...options,
    },
  });
  return response.data;
}
