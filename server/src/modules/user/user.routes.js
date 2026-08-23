import { Router } from "express";

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:userId", getUser);

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
