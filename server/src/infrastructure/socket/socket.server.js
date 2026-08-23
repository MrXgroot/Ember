import { Server } from "socket.io";
import { socketAuth } from "./socket.auth.js";
import { userRoom } from "./socket.rooms.js";
import { registerMessageSocket } from "../../modules/message/message.socket.js";
import { userConnected, userDisconnected } from "./socket.presence.js";
export function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.join(userRoom(socket.userId));
    userConnected(socket.userId);
    registerMessageSocket(io, socket);

    socket.on("disconnect", async (reason) => {
      const lastOnlineAt = await userDisconnected(socket.userId);

      console.log(`🔌 Socket disconnected: ${socket.userId}`, reason);
      if (lastOnlineAt) {
        io.emit("user:offline", {
          userId: socket.userId,
          lastOnlineAt,
        });
      }
    });
  });

  return io;
}
