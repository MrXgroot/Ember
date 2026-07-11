// modules/user/user.routes.js

import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

router.post("/", userController.createUser);

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUser);

router.patch("/:userId", userController.updateUser);

router.delete("/:userId", userController.deleteUser);

export default router;
