import notificationService from "./notification.service.js";

class NotificationController {
  async getNotifications(req, res) {
    const { page, limit, sort, ...filters } = req.query;

    const notifications = await notificationService.getNotifications({
      filters: {
        recipient: req.user._id,
        ...filters,
      },

      options: {
        page,
        limit,
        sort,
      },
    });

    res.status(200).json(notifications);
  }

  async createNotification(req, res) {
    const notification = await notificationService.create(req.body);

    res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  }

  async markAsRead(req, res) {
    const notification = await notificationService.markAsRead(req.params.id);

    res.status(200).json({
      message: "Notification marked as read",
      data: notification,
    });
  }

  async markAllAsRead(req, res) {
    await notificationService.markAllAsRead(req.user._id);

    res.status(200).json({
      message: "Notifications marked as read",
    });
  }
}

export default new NotificationController();
