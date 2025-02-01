import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  categoryDescription: {
    type: String,
    required: [true, "Category description is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "General"],
      message: "Gender must be either Male, Female, or General",
    },
    required: [true, "Gender is required"],
  },
  categoryImages: {
    type: String,
    required: [true, "Category image is required"],
    validate: {
      validator: function (value) {
        return typeof value === "string" && value.trim().length > 0;
      },
      message: "Category image must be a valid string",
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
