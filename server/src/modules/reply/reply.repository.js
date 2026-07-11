// modules/reply/reply.repository.js

import Reply from "./reply.model.js";

class ReplyRepository {
  async create(replyData) {
    return await Reply.create(replyData);
  }

  async findById(id) {
    return await Reply.findById(id);
  }

  async findOne(filter) {
    return await Reply.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return await Reply.find(filter, null, options);
  }

  async updateById(id, replyData) {
    return await Reply.findByIdAndUpdate(id, replyData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await Reply.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return await Reply.countDocuments(filter);
  }

  async exists(filter) {
    return await Reply.exists(filter);
  }
}

export default new ReplyRepository();
