import api from "@/shared/integrations/api/client";

export async function getUsers(params = {}) {
  const response = await api.get("/users", {
    params,
  });

  return response.data;
}
