// modules/reply/reply.service.js

import replyRepository from "./reply.repository.js";

class ReplyService {
  async createReply(replyData) {
    return await replyRepository.create(replyData);
  }

  async getReplies(query = {}) {
    const filters = {};
    const options = {};

    return await replyRepository.findMany(filters, options);
  }

  async getReply(id) {
    return await replyRepository.findById(id);
  }

  async updateReply(id, replyData) {
    return await replyRepository.updateById(id, replyData);
  }

  async deleteReply(id) {
    return await replyRepository.deleteById(id);
  }
}

export default new ReplyService();
