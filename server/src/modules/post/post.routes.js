import { Router } from "express";
import postController from "./post.controller.js";
import commentController from "../comment/comment.controller.js";
const router = Router();

router.post("/", postController.createPost);

router.get("/", postController.getPosts);

router.get("/:postId", postController.getPost);

router.patch("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost);

router.get("/:postId/comments", commentController.getComments);
export default router;
