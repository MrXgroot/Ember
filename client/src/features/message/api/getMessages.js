import api from "@/shared/integrations/api";

export async function getMessages(userId, params = {}) {
  const response = await api.get(`/messages/${userId}`, {
    params,
  });

  return response.data.data;
}
