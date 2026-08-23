import { Message } from "./message.model.js";

export async function createMessage(data) {
  return Message.create(data);
}

export async function getMessages({ userId, otherUserId, limit = 30, before }) {
  const filter = {
    $or: [
      {
        sender: userId,
        receiver: otherUserId,
      },
      {
        sender: otherUserId,
        receiver: userId,
      },
    ],
  };

  if (before) {
    filter.createdAt = {
      $lt: new Date(before),
    };
  }

  return Message.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("sender", "displayName username avatar")
    .populate("receiver", "displayName username avatar")
    .lean();
}

export async function findById(messageId) {
  return Message.findById(messageId);
}

export async function deleteMessage(messageId) {
  return Message.findByIdAndDelete(messageId);
}

export async function getInbox(userId) {
  return Message.aggregate([
    // Messages where the current user is either sender or receiver
    {
      $match: {
        $or: [{ sender: userId }, { receiver: userId }],
      },
    },

    // Newest messages first
    {
      $sort: {
        createdAt: -1,
      },
    },

    // Group by the OTHER person
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
        },

        lastMessage: {
          $first: "$$ROOT",
        },
      },
    },

    // Newest conversations first
    {
      $sort: {
        "lastMessage.createdAt": -1,
      },
    },

    // Get the other user's information
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },

    {
      $unwind: "$user",
    },

    {
      $project: {
        _id: 0,

        user: {
          _id: "$user._id",
          displayName: "$user.displayName",
          username: "$user.username",
          avatar: "$user.avatar",
        },

        lastMessage: {
          _id: "$lastMessage._id",
          content: "$lastMessage.content",
          sender: "$lastMessage.sender",
          receiver: "$lastMessage.receiver",
          createdAt: "$lastMessage.createdAt",
        },
      },
    },
  ]);
}
