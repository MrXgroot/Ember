import api from "@/shared/integrations/api";

export async function markAllNotificationsAsRead() {
  const response = await api.patch("/notifications/read-all");

  return response.data.data;
}
