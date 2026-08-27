import { useEffect } from "react";
import { socket } from "@/shared/integrations/socket/socket";
import { getToken } from "@/app/auth";

export function SocketProvider({ children }) {
  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    socket.auth = {
      token,
    };
    socket.connect();

    const handleConnect = () => {
      console.log("🟢 SOCKET CONNECTED:", socket.id);
    };

    const handleDisconnect = (reason) => {
      console.log("🔴 SOCKET DISCONNECTED:", reason);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return children;
}
