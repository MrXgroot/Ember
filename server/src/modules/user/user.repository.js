// modules/user/user.repository.js

import User from "./user.model.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async findOne(filter) {
    return await User.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return await User.find(filter, null, options);
  }

  async updateById(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async count(filter = {}) {
    return await User.countDocuments(filter);
  }

  async exists(filter) {
    return await User.exists(filter);
  }
}

export default new UserRepository();
