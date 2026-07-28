export const communityKeys = {
  all: ["communities"],

  lists: () => [...communityKeys.all, "list"],

  list: (request = {}) => [...communityKeys.lists(), request],

  details: () => [...communityKeys.all, "detail"],

  detail: (slug) => [...communityKeys.details(), slug],
};
