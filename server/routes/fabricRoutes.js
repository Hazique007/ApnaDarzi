import express from "express";
import { getFabricGenderPlusCategory } from "../controllers/productController.js";
const router = express.Router();

router.get("/getFabricGenderPlusCategory", getFabricGenderPlusCategory);

export default router;
