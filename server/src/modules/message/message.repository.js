import { Message } from "./message.model.js";
import mongoose from "mongoose";
export async function createMessage(data) {
  const message = await Message.create(data);

  return Message.findById(message._id)
    .populate("sender", "displayName username avatar")
    .populate("receiver", "displayName username avatar")
    .lean();
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
    .sort({ createdAt: 1 })
    .limit(Number(limit))
    .populate("sender", "displayName username avatar")
    .populate("receiver", "displayName username avatar")
    .lean();
}

export async function findById(messageId) {
  return Message.findById(messageId)
    .populate("sender", "displayName username avatar")
    .populate("receiver", "displayName username avatar")
    .lean();
}

export async function deleteMessage(messageId) {
  return Message.findByIdAndDelete(messageId);
}

export async function getInbox(userId) {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  return Message.aggregate([
    {
      $match: {
        $or: [{ sender: userObjectId }, { receiver: userObjectId }],
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", userObjectId] }, "$receiver", "$sender"],
        },

        lastMessage: {
          $first: "$$ROOT",
        },
      },
    },

    {
      $sort: {
        "lastMessage.createdAt": -1,
      },
    },

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
