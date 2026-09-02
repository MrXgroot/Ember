// modules/comment/comment.repository.js

import Comment from "./comment.model.js";

class CommentRepository {
  async create(commentData) {
    return await Comment.create(commentData);
  }

  async findById(id, options = {}) {
    return await Comment.findById(id, null, options);
  }

  async findOne(filter, options = {}) {
    return await Comment.findOne(filter, null, options);
  }

  async findMany(filter = {}, options = {}) {
    return await Comment.find(filter, null, options);
  }

  async updateById(id, commentData) {
    return await Comment.findByIdAndUpdate(id, commentData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await Comment.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return await Comment.countDocuments(filter);
  }

  async exists(filter) {
    return await Comment.exists(filter);
  }
}

export default new CommentRepository();
