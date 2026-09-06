export const notificationKeys = {
  all: ["notifications"],

  lists: () => [...notificationKeys.all, "list"],

  list: (params) => [...notificationKeys.lists(), params],

  details: () => [...notificationKeys.all, "detail"],

  detail: (id) => [...notificationKeys.details(), id],
};
