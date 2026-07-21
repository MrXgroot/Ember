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
    return await Post.findByIdAndUpdate(postId, updateData, {
      returnDocument: "after",
      runValidators: true,
      ...options,
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

  async incrementScore(postId, amount) {
    return await Post.findByIdAndUpdate(
      postId,
      {
        $inc: {
          "metrics.score": amount,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }
}

export default new PostRepository();
