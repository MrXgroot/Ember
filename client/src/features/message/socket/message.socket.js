import { socket } from "@/shared/integrations/socket/socket";

export function emitSendMessage(data) {
  socket.emit("message:send", data);
}

export function emitDeleteMessage(messageId) {
  socket.emit("message:delete", {
    messageId,
  });
}

export function onMessageSent(callback) {
  socket.on("message:sent", callback);

  return () => {
    socket.off("message:sent", callback);
  };
}

export function onMessageReceived(callback) {
  socket.on("message:new", callback);

  return () => {
    socket.off("message:new", callback);
  };
}

export function onMessageDeleted(callback) {
  socket.on("message:deleted", callback);

  return () => {
    socket.off("message:deleted", callback);
  };
}

export function onMessageError(callback) {
  socket.on("message:error", callback);

  return () => {
    socket.off("message:error", callback);
  };
}
