// modules/user/user.service.js

import userRepository from "./user.repository.js";

class UserService {
  async createUser(userData) {
    return await userRepository.create(userData);
  }

  async getUsers(query = {}) {
    const filters = {};
    const options = {};

    if (query.username) {
      filters.username = query.username;
    }

    if (query.displayName) {
      filters.displayName = query.displayName;
    }

    return await userRepository.findMany(filters, options);
  }

  async getUser(userId) {
    return await userRepository.findById(userId);
  }

  async updateUser(userId, userData) {
    return await userRepository.updateById(userId, userData);
  }

  async deleteUser(userId) {
    return await userRepository.deleteById(userId);
  }
}

export default new UserService();
