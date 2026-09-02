// modules/save/save.routes.js

import { Router } from "express";

import * as saveController from "./save.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", authenticate, saveController.toggleSave);

export default router;
