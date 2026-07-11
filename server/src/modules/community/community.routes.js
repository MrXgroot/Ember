// modules/community/community.routes.js

import { Router } from "express";
import communityController from "./community.controller.js";

const router = Router();

router.post("/", communityController.createCommunity);

router.get("/", communityController.getCommunities);

router.get("/:communityId", communityController.getCommunity);

router.patch("/:communityId", communityController.updateCommunity);

router.delete("/:communityId", communityController.deleteCommunity);

export default router;
