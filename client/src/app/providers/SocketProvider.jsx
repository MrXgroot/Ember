import { useEffect } from "react";
import { socket } from "@/shared/integrations/socket/socket";
import { useAuth } from "../auth";

export function SocketProvider({ children }) {
  const { token } = useAuth();

  useEffect(() => {
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
  }, [token]);

  return children;
}
