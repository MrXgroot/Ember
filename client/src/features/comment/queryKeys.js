export const commentKeys = {
  all: ["comments"],

  lists: () => [...commentKeys.all, "list"],

  list: (postId) => [...commentKeys.lists(), postId],

  details: () => [...commentKeys.all, "detail"],

  detail: (commentId) => [...commentKeys.details(), commentId],
};
