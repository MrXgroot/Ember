// modules/comment/comment.service.js

import commentRepository from "./comment.repository.js";

class CommentService {
  async createComment(commentData) {
    return await commentRepository.create(commentData);
  }

  async getComments(query = {}) {
    const filters = {};
    const options = {};

    // We'll add filtering, sorting, pagination later.

    return await commentRepository.findMany(filters, options);
  }

  async getComment(id) {
    return await commentRepository.findById(id);
  }

  async updateComment(id, commentData) {
    return await commentRepository.updateById(id, commentData);
  }

  async deleteComment(id) {
    return await commentRepository.deleteById(id);
  }
}

export default new CommentService();
