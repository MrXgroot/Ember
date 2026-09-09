import api from "@/shared/integrations/api";

export async function checkBackend() {
  const response = await api.get("/health");

  return response.data;
}
