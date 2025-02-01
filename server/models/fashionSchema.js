import mongoose from "mongoose";

const fashionSchema = new mongoose.Schema({
  fashionImages: [
    {
      fashionImage: {
        type: String,
        required: [true, "Fashion image is required"],
      },
      category: {
        type: String,
        required: [true, "Category is required"],
      },
      gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Unisex"], // Restrict gender to valid options
      },
    },
  ],
});

const Fashion = mongoose.model("Fashion", fashionSchema);
export default Fashion;
