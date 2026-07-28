import postRepository from "./post.repository.js";
import PostQuery from "./post.query.js";

export const POST_POPULATE = [
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
  async createPost({ postData }) {
    return await postRepository.create(postData);
  }
  async getPosts(request = {}) {
    const query = await PostQuery.from(request);

    return await postRepository.findMany(query.filters, {
      ...query.options,
      populate: POST_POPULATE,
    });
  }

  async getPost({ postId }) {
    return await postRepository.findById(postId, {
      populate: POST_POPULATE,
    });
  }

  async updatePost({ postId, postData }) {
    return await postRepository.updateById(postId, postData);
  }

  async deletePost({ postId }) {
    return await postRepository.deleteById(postId);
  }
}

export default new PostService();
