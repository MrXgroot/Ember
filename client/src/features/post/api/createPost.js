import api from "@/shared/integrations/api";

export async function createPost(data) {
  const response = await api.post("/posts", data);

  return response.data;
}
