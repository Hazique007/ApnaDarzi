import express from "express";
import {
  createOrderSummary,
  getOrderSummary,
  updateOrderSummary,
  deleteOrderSummary,
} from "../controllers/ordersummarycontroller.js";

const router = express.Router();

// Create a new order summary
router.post("/", createOrderSummary);

// Get order summary by user ID
router.get("/:userId", getOrderSummary);

// Update an order summary
router.put("/:id", updateOrderSummary);

// Delete an order summary
router.delete("/:id", deleteOrderSummary);

export default router;
