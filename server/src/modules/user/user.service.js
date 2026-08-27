import userRepository from "./user.repository.js";
import UserQuery from "./user.query.js";

import { isUserOnline } from "../../infrastructure/socket/socket.presence.js";

export async function createUser(userData) {
  return userRepository.createUser(userData);
}

export async function getUsers(request = {}) {
  const query = await UserQuery.from(request);

  const users = await userRepository.findUsers(query.filters, query.options);

  return users.map((user) => ({
    ...user.toObject(),
    isOnline: isUserOnline(user._id.toString()),
  }));
}

export async function getUser(userId) {
  const user = await userRepository.findUserById(userId, {
    select: "displayName username avatar bio banner lastOnlineAt",
  });

  if (!user) {
    return null;
  }

  return {
    ...user.toObject(),
    isOnline: isUserOnline(user._id.toString()),
  };
}

export async function updateUser(userId, userData) {
  return userRepository.updateUserById(userId, userData);
}

export async function deleteUser(userId) {
  return userRepository.deleteUserById(userId);
}

export async function getUserByGoogleId(googleId) {
  return userRepository.findByGoogleId(googleId);
}
