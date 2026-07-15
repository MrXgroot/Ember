// services/post.service.js

import postRepository from "./post.repository.js";

const POST_POPULATE = [
  {
    path: "user",
    select: "displayName username avatar",
  },
  {
    path: "community",
    select: "name slug avatar",
  },
];

class PostService {
  async createPost(postData) {
    return await postRepository.create(postData);
  }

  async getPosts(filters = {}, options = {}) {
    return await postRepository.findMany(filters, {
      ...options,
      populate: POST_POPULATE,
    });
  }

  async getPost(postId, options = {}) {
    return await postRepository.findById(postId, {
      ...options,
      populate: POST_POPULATE,
    });
  }

  async updatePost(postId, updateData) {
    return await postRepository.updateById(postId, updateData);
  }

  async deletePost(postId) {
    return await postRepository.deleteById(postId);
  }
}

export default new PostService();
