import notificationRepository from "./notification.repostitory.js";

export async function createNotification({
  recipient,
  actor = null,
  type,
  message,
  entity = null,
}) {
  // Don't notify users about their own actions
  if (actor && recipient.toString() === actor.toString()) {
    return null;
  }

  const notification = await notificationRepository.create({
    recipient,
    actor,
    type,
    message,
    entity,
  });

  return notification;
}

export async function createNotifications(notifications) {
  if (!notifications?.length) {
    return [];
  }

  const filteredNotifications = notifications.filter(
    ({ recipient, actor }) =>
      !actor || recipient.toString() !== actor.toString(),
  );

  if (!filteredNotifications.length) {
    return [];
  }

  const data = filteredNotifications.map(
    ({ recipient, actor = null, type, message, entity = null }) => ({
      recipient,
      actor,
      type,
      message,
      entity,
    }),
  );

  return notificationRepository.createMany(data);
}

export async function getNotification(id) {
  return notificationRepository.findById(id);
}

export async function getNotifications(recipientId, options = {}) {
  return notificationRepository.findMany(
    {
      recipient: recipientId,
    },
    options,
  );
}

export async function markAsRead(notificationId, userId) {
  const notification = await notificationRepository.findById(notificationId);

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.recipient.toString() !== userId.toString()) {
    throw new Error("You can only update your own notifications");
  }

  return notificationRepository.markAsRead(notificationId);
}

export async function markAllAsRead(userId) {
  return notificationRepository.markAllAsRead(userId);
}
