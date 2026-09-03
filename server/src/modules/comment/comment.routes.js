// modules/comment/comment.routes.js

import { Router } from "express";

import * as commentController from "./comment.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, commentController.createComment);

router.get("/", commentController.getComments);

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
