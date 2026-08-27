import Notification from "./notification.model.js";

class NotificationRepository {
  async create(data) {
    return Notification.create(data);
  }

  async createMany(data) {
    return Notification.insertMany(data);
  }

  async findById(id) {
    return Notification.findById(id)
      .populate("actor", "displayName username avatar")
      .populate("recipient", "displayName username avatar");
  }

  async findMany(filters = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;

    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find(filters)
        .populate("actor", "displayName username avatar")
        .sort(sort)
        .skip(skip)
        .limit(limit),

      Notification.countDocuments(filters),
    ]);

    return {
      notifications,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id) {
    return Notification.findByIdAndUpdate(
      id,
      {
        readAt: new Date(),
      },
      { new: true },
    );
  }

  async markAllAsRead(recipient) {
    return Notification.updateMany(
      {
        recipient,
        readAt: null,
      },
      {
        $set: {
          readAt: new Date(),
        },
      },
    );
  }
}

export default new NotificationRepository();
