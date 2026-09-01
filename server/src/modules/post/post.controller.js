import postService from "./post.service.js";

class PostController {
  async createPost(req, res) {
    console.log(req.body);
    const post = await postService.createPost({
      postData: {
        ...req.body,
        user: req.user.id,
      },
    });

    res.status(201).json(post);
  }

  async getPosts(req, res) {
    const { page, limit, sort, ...filters } = req.query;
    console.log(req.query);
    const posts = await postService.getPosts({
      filters,

      options: {
        page,
        limit,
        sort,
      },
    });

    res.status(200).json(posts);
  }

  async getPost(req, res) {
    const { postId } = req.params;

    const post = await postService.getPost({
      postId,
    });

    res.status(200).json(post);
  }

  async updatePost(req, res) {
    const { postId } = req.params;

    const post = await postService.updatePost({
      postId,
      postData: req.body,
    });

    res.status(200).json(post);
  }

  async deletePost(req, res) {
    const { postId } = req.params;

    await postService.deletePost({
      postId,
    });

    res.status(204).send();
  }
}

export default new PostController();
