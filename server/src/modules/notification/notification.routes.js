import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", authenticate, notificationController.getNotifications);

router.get(
  "/:notificationId",
  authenticate,
  notificationController.getNotification,
);

router.patch(
  "/:notificationId/read",
  authenticate,
  notificationController.markAsRead,
);

router.patch("/read-all", authenticate, notificationController.markAllAsRead);

export default router;
