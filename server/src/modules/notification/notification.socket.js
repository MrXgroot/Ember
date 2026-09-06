import { getIO } from "../../infrastructure/socket/index.js";
import { userRoom } from "../../infrastructure/socket/socket.rooms.js";
import * as notificationService from "./notification.service.js";

export async function emitNotification(notification) {
  if (!notification?.recipient) return;

  const savedNotification =
    await notificationService.createNotification(notification);

  if (!savedNotification) return;

  const io = getIO();

  const recipientId =
    savedNotification.recipient?._id?.toString() ||
    savedNotification.recipient?.toString();

  io.to(userRoom(recipientId)).emit("notification:new", savedNotification);
}
