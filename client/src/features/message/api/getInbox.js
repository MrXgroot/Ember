import api from "@/shared/integrations/api";

export async function getInbox() {
  const response = await api.get("/messages");

  return response.data.data;
}
