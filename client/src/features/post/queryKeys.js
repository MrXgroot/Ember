export const postKeys = {
  all: ["posts"],

  lists: () => [...postKeys.all, "list"],

  list: (filters) => [...postKeys.lists(), filters],

  details: () => [...postKeys.all, "detail"],

  detail: (id) => [...postKeys.details(), id],
};
