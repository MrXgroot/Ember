import postService from "./post.service.js";

class PostController {
  async createPost(req, res) {
    const post = await postService.createPost(req.body);

    res.status(201).json(post);
  }

  async getPosts(req, res) {
    const posts = await postService.getPosts(req.query);

    res.status(200).json(posts);
  }

  async getPost(req, res) {
    const post = await postService.getPost(req.params.postId);

    res.status(200).json(post);
  }

  async updatePost(req, res) {
    const post = await postService.updatePost(req.params.postId, req.body);

    res.status(200).json(post);
  }

  async deletePost(req, res) {
    await postService.deletePost(req.params.postId);

    res.status(204).send();
  }
}

export default new PostController();
