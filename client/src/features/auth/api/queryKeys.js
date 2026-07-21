export const authKeys = {
  all: ["auth"],

  currentUser: () => [...authKeys.all, "currentUser"],
};
