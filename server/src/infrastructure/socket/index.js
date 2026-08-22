import { createSocketServer } from "./socket.server.js";

let io;

export function initializeSocket(server) {
  io = createSocketServer(server);
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
}
