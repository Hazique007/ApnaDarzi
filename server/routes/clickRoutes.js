import express from "express";
const router = express.Router();

import { getClickStats, trackClick } from "../controllers/clickController.js";

router.post("/trackClick", trackClick);
router.get("/getClickStats", getClickStats);

export default router;
