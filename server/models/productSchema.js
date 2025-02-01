import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Product name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  subCategory: {
    type: String,
    required: [true, "sybCategory is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "General"],
    required: [true, "Must Provide your gender for better experiance"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive value"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  fabric: {
    type: String,
    // required: [true, "Fabric type is required"],
  },
  sizes: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
    // required: [true, "Available sizes must be specified"],
  },
  colors: {
    type: [String],
    // required: [true, "Available colors must be specified"],
  },
  isCustomized: {
    type: Boolean,
    default: false,
  },
  customizationOptions: {
    type: String,
    required: function () {
      return this.isCustomized;
    },
  },
  images: {
    type: [String],
    required: [true, "Product images are required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  categoryDescription: {
    type: String,
    required: [true, "Category description is required"],
    // trim: true,
  },
  highlight: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
