import { Server } from "socket.io";
import { socketAuth } from "./socket.auth.js";
import { userRoom } from "./socket.rooms.js";

export function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.userId}`);

    socket.join(userRoom(socket.userId));

    socket.on("disconnect", (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.userId}`, reason);
    });
  });

  return io;
}
