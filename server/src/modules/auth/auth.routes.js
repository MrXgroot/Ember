import { Router } from "express";

import authController from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post("/google", authController.googleLogin);

router.get("/me", authenticate, authController.getCurrentUser);

export default router;
