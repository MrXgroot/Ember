import api from "@/shared/integrations/api";

export async function getPost(postId) {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
}
