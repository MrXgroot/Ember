import express from "express";

import notificationController from "./notification.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", notificationController.getNotifications);

router.post("/", notificationController.createNotification);

router.patch("/read-all", notificationController.markAllAsRead);

router.patch("/:id/read", notificationController.markAsRead);

export default router;
