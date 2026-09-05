import * as messageRepository from "./message.repository.js";
import * as userService from "../user/user.service.js";
const MESSAGE_TTL = 7 * 24 * 60 * 60 * 1000;

export async function createMessage({ senderId, receiverId, content }) {
  if (!content?.trim()) {
    throw new Error("Message content is required");
  }

  if (senderId.toString() === receiverId.toString()) {
    throw new Error("You cannot send a message to yourself");
  }

  const message = await messageRepository.createMessage({
    sender: senderId,
    receiver: receiverId,
    content: content.trim(),
    expiresAt: new Date(Date.now() + MESSAGE_TTL),
  });

  return message;
}

export async function getMessages({ userId, otherUserId, limit, before }) {
  try {
    const [messages, recipient] = await Promise.all([
      messageRepository.getMessages({
        userId,
        otherUserId,
        limit,
        before,
      }),

      userService.getUser(otherUserId),
    ]);

    return {
      messages,
      recipient,
    };
  } catch (error) {
    throw error;
  }
}
export async function deleteMessage({ messageId, userId }) {
  const message = await messageRepository.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.sender.toString() !== userId.toString()) {
    throw new Error("You can only delete your own messages");
  }

  return messageRepository.deleteMessage(messageId);
}
export async function getInbox(userId) {
  return messageRepository.getInbox(userId);
}
