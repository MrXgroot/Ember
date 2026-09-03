import { Router } from "express";

import postController from "./post.controller.js";

import { authenticate, optionalAuthenticate } from "../auth/auth.middleware.js";
import voteRoutes from "../vote/vote.routes.js";
import saveRoutes from "../save/save.routes.js";
import commentRoutes from "../comment/comment.routes.js";

const router = Router();

router.post("/", authenticate, postController.createPost);

router.get("/", optionalAuthenticate, postController.getPosts);

router.get("/:postId", optionalAuthenticate, postController.getPost);

router.patch("/:postId", authenticate, postController.updatePost);

router.delete("/:postId", authenticate, postController.deletePost);

// Vote
router.use("/:postId/vote", voteRoutes);

// Save
router.use("/:postId/save", saveRoutes);

router.use("/:postId/comments", commentRoutes);

export default router;
