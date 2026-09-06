import api from "@/shared/integrations/api";

export async function getNotifications(params = {}) {
  const response = await api.get("/notifications", {
    params,
  });

  return {
    notifications: response.data.data,
    meta: response.data.meta,
  };
}
