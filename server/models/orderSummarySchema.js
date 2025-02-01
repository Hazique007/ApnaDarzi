import mongoose from "mongoose";

const orderSummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user model
    required: true,
  },
  fabricStyle: {
    type: String,
    required: true,
  },
  fabricCharges: {
    type: Number,
    required: true,
    default: function () {
      return this.fabricProvidedByUser ? 0 : 500; // Example default value if not provided
    },
  },
  fabricProvidedByUser: {
    type: Boolean,
    required: true,
  },
  stitchingCharges: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: function () {
      return this.fabricCharges + this.stitchingCharges; // Automatically calculate total
    },
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

const OrderSummary = mongoose.model("OrderSummary", orderSummarySchema);
export default OrderSummary;
