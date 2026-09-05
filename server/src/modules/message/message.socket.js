import * as messageService from "./message.service.js";
import { userRoom } from "../../infrastructure/socket/socket.rooms.js";

export function registerMessageSocket(io, socket) {
  socket.on("message:send", async (data) => {
    try {
      const { receiverId, content } = data;
      const message = await messageService.createMessage({
        senderId: socket.userId,
        receiverId,
        content,
      });

      // Send to receiver
      io.to(userRoom(receiverId)).emit("message:new", message);

      // Also send back to sender
      socket.emit("message:sent", message);
    } catch (error) {
      socket.emit("message:error", {
        message: error.message,
      });
    }
  });

  socket.on("message:delete", async (data) => {
    try {
      const { messageId } = data;

      const message = await messageService.deleteMessage({
        messageId,
        userId: socket.userId,
      });

      // Tell both sides that the message disappeared
      io.to(userRoom(message.receiver)).emit("message:deleted", {
        messageId,
      });

      socket.emit("message:deleted", {
        messageId,
      });
    } catch (error) {
      socket.emit("message:error", {
        message: error.message,
      });
    }
  });
}
