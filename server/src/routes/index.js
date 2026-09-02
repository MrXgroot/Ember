import { Router } from "express";

import postRoutes from "../modules/post/post.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import communityRoutes from "../modules/community/community.routes.js";
import commentRoutes from "../modules/comment/comment.routes.js";
import uploadRoutes from "../modules/upload/upload.routes.js";
import messageRoutes from "../modules/message/message.routes.js";
import saveRoutes from "../modules/save/save.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/communities", communityRoutes);
router.use("/comments", commentRoutes);
router.use("/upload", uploadRoutes);
router.use("/messages", messageRoutes);

export default router;

// have to correct the add vote/:postId and save/:postId
