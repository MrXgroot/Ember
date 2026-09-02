// modules/vote/vote.routes.js

import { Router } from "express";

import * as voteController from "./vote.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router({
  mergeParams: true,
});

router.post("/", authenticate, voteController.votePost);

export default router;
