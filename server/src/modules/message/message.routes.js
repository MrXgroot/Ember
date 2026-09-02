import { Router } from "express";

import * as messageController from "./message.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/:otherUserId", authenticate, messageController.getMessages);
router.get("/", authenticate, messageController.getInbox);

export default router;
