import userRepository from "../../modules/user/user.repository.js";

const onlineUsers = new Map();

export function userConnected(userId) {
  const count = onlineUsers.get(userId) ?? 0;

  onlineUsers.set(userId, count + 1);
}

export async function userDisconnected(userId) {
  const count = onlineUsers.get(userId) ?? 0;

  if (count > 1) {
    onlineUsers.set(userId, count - 1);
    return null;
  }

  onlineUsers.delete(userId);

  const lastOnlineAt = new Date();

  await userRepository.updateUserById(userId, {
    lastOnlineAt,
  });

  return lastOnlineAt;
}

export function isUserOnline(userId) {
  return onlineUsers.has(userId);
}

export function getOnlineUsers() {
  return [...onlineUsers.keys()];
}
