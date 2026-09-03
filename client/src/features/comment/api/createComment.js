import api from "@/shared/integrations/api";

export async function createComment(postId, data) {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response.data.data;
}
