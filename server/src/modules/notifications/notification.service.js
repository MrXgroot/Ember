import notificationRepository from "./notification.repository.js";

class NotificationService {
  async create({ data, recipients, options = {} }) {
    const userIds = await this.resolveRecipients(recipients);

    if (!userIds.length) {
      return [];
    }

    const notifications = userIds.map((recipient) => ({
      recipient,
      actor: data.actorId ?? null,

      type: data.type,

      entity: {
        type: data.entityType ?? null,
        id: data.entityId ?? null,
      },
    }));

    const created = await notificationRepository.createMany(notifications);

    // Realtime can be plugged in here later.
    if (options.realtime) {
      await this.dispatchRealtime(created);
    }

    return created;
  }

  async resolveRecipients(recipients = {}) {
    if (recipients.userIds?.length) {
      return recipients.userIds;
    }

    if (recipients.userId) {
      return [recipients.userId];
    }

    if (recipients.broadcast === true) {
      return this.getAllUserIds();
    }

    return [];
  }

  async getAllUserIds() {
    // We'll connect this to UserRepository later.
    return [];
  }

  async dispatchRealtime(notifications) {
    // Socket infrastructure will come here later.
    return notifications;
  }

  async getNotifications({ filters, options }) {
    return notificationRepository.findMany(filters, options);
  }

  async markAsRead(id) {
    return notificationRepository.markAsRead(id);
  }

  async markAllAsRead(recipient) {
    return notificationRepository.markAllAsRead(recipient);
  }
}

export default new NotificationService();
