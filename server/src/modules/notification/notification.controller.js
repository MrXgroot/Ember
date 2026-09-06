import * as notificationService from "./notification.service.js";

export async function getNotifications(req, res, next) {
  try {
    const { page, limit } = req.query;

    const result = await notificationService.getNotifications(req.user.id, {
      page,
      limit,
    });

    res.status(200).json({
      message: "Notifications fetched successfully.",
      data: result.notifications,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
}

export async function getNotification(req, res, next) {
  try {
    const notification = await notificationService.getNotification(
      req.params.notificationId,
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    // Don't allow users to access another user's notification
    if (notification.recipient.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You cannot access this notification.",
      });
    }

    res.status(200).json({
      message: "Notification fetched successfully.",
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req, res, next) {
  try {
    const notification = await notificationService.markAsRead(
      req.params.notificationId,
      req.user.id,
    );

    res.status(200).json({
      message: "Notification marked as read.",
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(req, res, next) {
  try {
    const result = await notificationService.markAllAsRead(req.user.id);

    res.status(200).json({
      message: "All notifications marked as read.",
      data: {
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
}
