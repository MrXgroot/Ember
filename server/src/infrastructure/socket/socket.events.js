import { getIO } from "./index.js";
import { userRoom, conversationRoom } from "./socket.rooms.js";

export function emitToUser(userId, event, data) {
  getIO().to(userRoom(userId)).emit(event, data);
}

export function emitToUsers(userIds, event, data) {
  const io = getIO();

  for (const userId of userIds) {
    io.to(userRoom(userId)).emit(event, data);
  }
}

export function emitToConversation(conversationId, event, data) {
  getIO().to(conversationRoom(conversationId)).emit(event, data);
}

export function broadcast(event, data) {
  getIO().emit(event, data);
}
