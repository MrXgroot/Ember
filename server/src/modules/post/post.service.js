// services/post.service.js

import postRepository from "./post.repository.js";

class PostService {
  async createPost(postData) {
    const post = await postRepository.create(postData);

    return post;
  }

  async getPosts(filters = {}, options = {}) {
    const posts = await postRepository.findMany(filters, options);

    return posts;
  }

  async getPost(postId) {
    const post = await postRepository.findById(postId);

    return post;
  }

  async updatePost(postId, updateData) {
    const post = await postRepository.updateById(postId, updateData);

    return post;
  }

  async deletePost(postId) {
    await postRepository.deleteById(postId);

    return;
  }
}

export default new PostService();
