import api from "./client";

import { getToken } from "@/app/auth";

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO:
      // auth.logout();
      // modal.open("auth");
      // redirect("/login");
    }

    return Promise.reject(error);
  },
);

export default api;
