import mongoose from "mongoose";

// Helper function to format date to dd/mm/yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "Otp",
      required: true,
    },
    status: {
      type: String,

      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    customizationOptions: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    isCustomized: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },

    addressID: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      require: true,
    },

    deliveryDate: {
      type: String, // Stored as a string in dd/mm/yyyy format
      default: () => formatDate(new Date()), // Automatically format the date
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
