import * as commentService from "./comment.service.js";

export async function createComment(req, res, next) {
  const { content, parent = null } = req.body;

  try {
    const comment = await commentService.createComment({
      post: req.params.postId,
      user: req.user.id,
      content,
      parent,
    });

    res.status(201).json({
      message: "Comment created successfully.",
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
}

export async function getComments(req, res, next) {
  try {
    const comments = await commentService.getComments(
      { post: req.params.postId },
      {
        sort: {
          createdAt: 1,
        },
      },
    );

    res.json({
      message: "Comments fetched successfully.",
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
}

export async function getComment(req, res, next) {
  try {
    const comment = await commentService.getComment(req.params.commentId);

    res.json({
      message: "Comment fetched successfully.",
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateComment(req, res, next) {
  try {
    const comment = await commentService.updateComment(
      req.params.commentId,
      req.body,
    );

    res.json({
      message: "Comment updated successfully.",
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    await commentService.deleteComment(req.params.commentId);

    res.json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
