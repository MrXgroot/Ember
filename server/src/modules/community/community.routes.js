// modules/community/community.routes.js

import { Router } from "express";
import authenticate from "../auth/auth.middleware.js";
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  getCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from "./community.controller.js";

const router = Router();

router.post("/", authenticate, createCommunity);

router.get("/", getCommunities);

router.post("/:communityId/join", authenticate, joinCommunity);

router.post("/:communityId/leave", authenticate, leaveCommunity);

router.get("/:slug", getCommunity);

router.patch("/:communityId", updateCommunity);

router.delete("/:communityId", deleteCommunity);

export default router;
