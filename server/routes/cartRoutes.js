import { addToCart } from "../controllers/cartController.js";
import express from "express";
const router = express.Router();

router.post("/add-to-cart", addToCart);

export default router;
