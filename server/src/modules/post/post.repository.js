// repositories/post.repository.js

import Post from "./post.model.js";

class PostRepository {
  async create(postData) {
    return await Post.create(postData);
  }

  async findById(postId, options = {}) {
    let query = Post.findById(postId);

    for (const populate of options.populate ?? []) {
      query = query.populate(populate);
    }

    return await query;
  }

  async findOne(filter = {}, options = {}) {
    let query = Post.findOne(filter);

    for (const populate of options.populate ?? []) {
      query = query.populate(populate);
    }

    return await query;
  }

  async findMany(filter = {}, options = {}) {
    const { populate, ...queryOptions } = options;

    let query = Post.find(filter, null, queryOptions);

    for (const item of populate ?? []) {
      query = query.populate(item);
    }

    return await query;
  }

  async updateById(postId, updateData, options = {}) {
    let query = Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
      ...options,
    });

    return await query;
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
