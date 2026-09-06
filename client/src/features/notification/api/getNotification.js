import api from "@/shared/integrations/api";

export async function getNotification(notificationId) {
  const response = await api.get(`/notifications/${notificationId}`);

  return response.data.data.notification;
}
