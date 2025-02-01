import mongoose from "mongoose";

const agentOrderSchema = new mongoose.Schema(
  {
    fabricPickedUp: {
      type: Boolean,
      required: true,
      default: false,
    },
    measurementDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    apparelDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentReceived: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "Otp",
      require: true,
    },
    orderID: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AgentOrder = mongoose.model("AgentOrder", agentOrderSchema);
export default AgentOrder;
