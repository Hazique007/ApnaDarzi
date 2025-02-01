import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({
  trendingItems: [
    {
      trendingImage: {
        type: String,
        required: [true, "Trending image is required"],
      },
      category: {
        type: String,
        required: [true, "Category is required"],
      },
      gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Unisex"], 
      },
    },
  ],
});

const Trending = mongoose.model("Trending", trendingSchema);
export default Trending;
