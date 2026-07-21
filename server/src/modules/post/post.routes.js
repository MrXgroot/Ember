import { Router } from "express";
import postController from "./post.controller.js";
import commentController from "../comment/comment.controller.js";
import voteController from "../vote/vote.controller.js";

import authenticate from "../auth/auth.middleware.js";

const router = Router();

router.post("/", authenticate, postController.createPost);

router.get("/", postController.getPosts);

router.get("/:postId", postController.getPost);

router.patch("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost);
router.post("/:postId/comments", authenticate, commentController.createComment);
router.get("/:postId/comments", commentController.getComments);

router.post("/:postId/vote", authenticate, voteController.votePost);
export default router;
