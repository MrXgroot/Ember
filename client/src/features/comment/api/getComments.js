import api from "@/shared/integrations/api";

export async function getComments(postId) {
  const response = await api.get(`/posts/${postId}/comments`);

  return response.data.data;
}
