// modules/comment/comment.routes.js

import { Router } from "express";
import commentController from "./comment.controller.js";

const router = Router();

router.post("/", commentController.createComment);

router.get("/", commentController.getComments);

router.get("/:commentId", commentController.getComment);

router.patch("/:commentId", commentController.updateComment);

router.delete("/:commentId", commentController.deleteComment);

export default router;
