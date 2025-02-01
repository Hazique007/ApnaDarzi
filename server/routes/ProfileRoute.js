import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  addAddress,
  addOrder,
  addSupportTicket,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/profilecontroller";

const router = express.Router();

// Profile Routes
router.post("/", createProfile);
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);

// Address Routes
router.post("/:userId/addresses", addAddress);

// Order Routes
router.post("/:userId/orders", addOrder);

// Support Routes
router.post("/:userId/help-and-support", addSupportTicket);

// Notification Routes
router.get("/:userId/notifications", getNotifications);
router.put("/:userId/notifications/:notificationId/read", markNotificationAsRead);

export default router;
