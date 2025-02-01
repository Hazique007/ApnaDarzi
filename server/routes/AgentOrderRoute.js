import express from "express";
import {
  createAgentOrder,
  getAndUpdateAgentOrder,
  getAgentOrder,
  updateAgentOrder,
  getAgentDetails,
  getAddressByID,
} from "../controllers/agentController.js";

const router = express.Router();

// Route to create a new agent order
router.post("/createagentorder", createAgentOrder);

// Route to fetch and update an agent order (combined logic)
router.get("/getandupdate", getAndUpdateAgentOrder);

// Route to fetch a specific agent order by ID
router.get("/agentorder", getAgentOrder);

router.get("/agentorderdetails", getAgentDetails);

// Route to update a specific agent order by ID
router.post("/updateagentorder", updateAgentOrder);
router.get("/getAddressByID", getAddressByID);

export default router;
