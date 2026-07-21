// modules/comment/comment.repository.js

import Comment from "./comment.model.js";

class CommentRepository {
  async create(commentData) {
    return await Comment.create(commentData);
  }

  async findById(id) {
    return await Comment.findById(id);
  }

  async findOne(filter) {
    return await Comment.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return await Comment.find(filter, null, options);
  }

  async findByPost(postId, options = {}) {
    return await Comment.find(
      {
        post: postId,
        parent: null,
      },
      null,
      options,
    );
  }

  async findReplies(parentId, options = {}) {
    return await Comment.find(
      {
        parent: parentId,
      },
      null,
      options,
    );
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
