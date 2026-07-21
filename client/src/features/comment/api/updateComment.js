import api from "@/shared/integrations/api";

export async function updateComment(commentId, data) {
  const response = await api.patch(`/comments/${commentId}`, data);

  return response.data.data;
}
