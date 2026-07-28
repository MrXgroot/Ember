import api from "@/shared/integrations/api";

export async function deleteComment(commentId) {
  const response = await api.delete(`/comments/${commentId}`);

  return response.data.data;
}
