import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  getOrdersGroupedByDate,
  updateOrderStatus,
  updateOrderStatustoDone,
} from "../controllers/orderController.js";

const router = express.Router();

// Route to create a new order
router.post("/create", createOrder);

router.put("/updatestatus", updateOrderStatus);

// Route to get all orders
router.get("/getorder", getOrders);

router.get("/getOrdersByUser", getOrdersByUser),
  router.get("/grouped", getOrdersGroupedByDate);

// Route to get a specific order by ID
router.get("/getOrderbyID", getOrderById);

// Route to update an order by ID
router.put("/:id", updateOrder);

// Route to delete an order by ID
router.delete("/:id", deleteOrder);
router.post("/updateOrderStatustoDone", updateOrderStatustoDone);

export default router;
