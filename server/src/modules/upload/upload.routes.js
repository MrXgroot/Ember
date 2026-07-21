import { Router } from "express";

import { getUploadSignature } from "./upload.controller.js";

const router = Router();

router.get("/signature", getUploadSignature);

export default router;
