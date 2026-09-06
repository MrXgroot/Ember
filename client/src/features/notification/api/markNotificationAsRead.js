import api from "@/shared/integrations/api";

export async function markNotificationAsRead(notificationId) {
  const response = await api.patch(`/notifications/${notificationId}/read`);

  return response.data.data.notification;
}
