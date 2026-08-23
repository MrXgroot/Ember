export const messageKeys = {
  all: ["messages"],

  inbox: () => [...messageKeys.all, "inbox"],

  conversation: (userId) => [...messageKeys.all, "conversation", userId],
};
