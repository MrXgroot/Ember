// modules/comment/comment.controller.js

import commentService from "./comment.service.js";

class CommentController {
  async createComment(req, res) {
    const comment = await commentService.createComment(req.body);

    res.status(201).json(comment);
  }

  async getComments(req, res) {
    const comments = await commentService.getComments(req.query);
    res.status(200).json(comments);
  }

  async getComment(req, res) {
    const comment = await commentService.getComment(req.params.commentId);

    res.status(200).json(comment);
  }

  async updateComment(req, res) {
    const comment = await commentService.updateComment(
      req.params.commentId,
      req.body,
    );

    res.status(200).json(comment);
  }

  async deleteComment(req, res) {
    await commentService.deleteComment(req.params.commentId);

    res.status(204).send();
  }
}

export default new CommentController();
