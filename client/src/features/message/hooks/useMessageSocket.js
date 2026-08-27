import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

  const sendMessage = useCallback((data) => {
    emitSendMessage(data);
  }, []);

  const deleteMessage = useCallback((messageId) => {
    emitDeleteMessage(messageId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const handleMessage = (message) => {
      queryClient.setQueryData(messageKeys.conversation(userId), (oldData) => {
        const messages = oldData?.data ?? oldData ?? [];

        // Prevent duplicates
        if (messages.some((item) => item._id === message._id)) {
          return oldData;
        }

        return [...messages, message];
      });
    };

    const handleMessageDeleted = ({ messageId }) => {
      queryClient.setQueryData(messageKeys.conversation(userId), (oldData) => {
        const messages = oldData?.data ?? oldData ?? [];

        return messages.filter((message) => message._id !== messageId);
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
  }, [userId, queryClient, onError]);

  return {
    sendMessage,
    deleteMessage,
  };
}
