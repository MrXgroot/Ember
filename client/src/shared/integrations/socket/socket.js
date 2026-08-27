import { io } from "socket.io-client";
import { getToken } from "@/app/auth";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
