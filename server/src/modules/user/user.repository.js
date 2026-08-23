// modules/user/user.repository.js

import { User } from "./user.model.js";

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserById(userId, options = {}) {
    let query = User.findById(userId);

    if (options.select) {
      query = query.select(options.select);
    }

    return await query;
  }

  async findUser(filter = {}, options = {}) {
    let query = User.findOne(filter);

    if (options.select) {
      query = query.select(options.select);
    }

    return await query;
  }

  async findUsers(filter = {}, options = {}) {
    const { select, sort = { createdAt: -1 }, skip = 0, limit = 20 } = options;

    let query = User.find(filter);

    if (select) {
      query = query.select(select);
    }

    return await query.sort(sort).skip(skip).limit(limit);
  }

  async findByGoogleId(googleId) {
    return await User.findOne({ googleId });
  }

  async updateUserById(userId, updateData, options = {}) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      ...options,
    });
  }

  async deleteUserById(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async countUsers(filter = {}) {
    return await User.countDocuments(filter);
  }

  async userExists(filter = {}) {
    return await User.exists(filter);
  }
}

export default new UserRepository();
