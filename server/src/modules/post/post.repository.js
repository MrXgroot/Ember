// repositories/post.repository.js

import Post from "./post.model.js";

class PostRepository {
  async create(postData) {
    return await Post.create(postData);
  }

  async findById(postId) {
    return await Post.findById(postId);
  }

  async findOne(filter) {
    return await Post.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return await Post.find(filter, null, options);
  }

  async updateById(postId, updateData) {
    return await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(postId) {
    return await Post.findByIdAndDelete(postId);
  }

  async count(filter = {}) {
    return await Post.countDocuments(filter);
  }

  async exists(filter) {
    return await Post.exists(filter);
  }
}

export default new PostRepository();
