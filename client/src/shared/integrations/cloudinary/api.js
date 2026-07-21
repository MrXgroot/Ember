import api from "@/shared/integrations/api";

export async function getUploadSignature() {
  const response = await api.get("/upload/signature");

  return response.data.data;
}
