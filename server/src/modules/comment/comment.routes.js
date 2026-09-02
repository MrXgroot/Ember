// modules/comment/comment.routes.js

import { Router } from "express";

import * as commentController from "./comment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

// Comments belonging to a post
router.post(
  "/posts/:postId/comments",
  authenticate,
  commentController.createComment,
);

router.get("/posts/:postId/comments", commentController.getComments);

// Individual comment
router.get("/comments/:commentId", commentController.getComment);

router.patch(
  "/comments/:commentId",
  authenticate,
  commentController.updateComment,
);

router.delete(
  "/comments/:commentId",
  authenticate,
  commentController.deleteComment,
);

export default router;
