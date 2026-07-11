// modules/reply/reply.routes.js

import { Router } from "express";
import replyController from "./reply.controller.js";

const router = Router();

router.post("/", replyController.createReply);

router.get("/", replyController.getReplies);

router.get("/:replyId", replyController.getReply);

router.patch("/:replyId", replyController.updateReply);

router.delete("/:replyId", replyController.deleteReply);

export default router;
