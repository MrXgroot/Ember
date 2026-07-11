import { Router } from "express";
import postController from "./post.controller.js";

const router = Router();

router.post("/", postController.createPost);

router.get("/", postController.getPosts);

router.get("/:postId", postController.getPost);

router.patch("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost);

export default router;
