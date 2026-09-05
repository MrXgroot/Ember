import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/auth";

import {
  emitSendMessage,
  emitDeleteMessage,
  onMessageSent,
  onMessageReceived,
  onMessageDeleted,
  onMessageError,
} from "../socket/message.socket";

import { messageKeys } from "../queryKeys";

export function useMessageSocket(userId, { onError } = {}) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const sendMessage = useCallback((data) => {
    emitSendMessage(data);
  }, []);

  const deleteMessage = useCallback((messageId) => {
    emitDeleteMessage(messageId);
  }, []);

  useEffect(() => {
    if (!userId || !user) return;

    const handleMessage = (message) => {
      queryClient.setQueryData(messageKeys.conversation(userId), (oldData) => {
        if (!oldData) return oldData;

        const messages = oldData.messages ?? [];

        if (messages.some((item) => item._id === message._id)) {
          return oldData;
        }

        const enrichedMessage = {
          ...message,

          sender:
            message.sender === user._id
              ? {
                  _id: user._id,
                  displayName: user.displayName,
                  username: user.username,
                  avatar: user.avatar,
                }
              : message.sender,
        };

        return {
          ...oldData,
          messages: [...messages, enrichedMessage],
        };
      });
    };

    const handleMessageDeleted = ({ messageId }) => {
      queryClient.setQueryData(messageKeys.conversation(userId), (oldData) => {
        if (!oldData) return oldData;

        const messages = oldData.messages ?? [];

        return {
          ...oldData,
          messages: messages.filter((message) => message._id !== messageId),
        };
      });
    };

    const cleanupSent = onMessageSent(handleMessage);
    const cleanupReceived = onMessageReceived(handleMessage);
    const cleanupDeleted = onMessageDeleted(handleMessageDeleted);
    const cleanupError = onMessageError(onError);

    return () => {
      cleanupSent?.();
      cleanupReceived?.();
      cleanupDeleted?.();
      cleanupError?.();
    };
  }, [userId, user, queryClient, onError]);

  return {
    sendMessage,
    deleteMessage,
  };
}
