import api from "@/shared/integrations/api";

export async function googleLogin(credential) {
  const response = await api.post("/auth/google", {
    credential,
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");

  return response.data;
}
