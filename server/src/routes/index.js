import { Router } from "express";

import postRoutes from "../modules/post/post.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import communityRoutes from "../modules/community/community.routes.js";
import commentRoutes from "../modules/comment/comment.routes.js";
import replyRoutes from "../modules/reply/reply.routes.js";
import uploadRoutes from "../modules/upload/upload.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/communities", communityRoutes);
router.use("/comments", commentRoutes);
router.use("/replies", replyRoutes);
router.use("/upload", uploadRoutes);
export default router;
