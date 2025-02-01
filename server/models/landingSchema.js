// landingSchema.js
import mongoose from "mongoose";

const landingSchema = new mongoose.Schema({
  bannerImages: [
    {
      image: { type: String, required: true },
      gender: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
});

const Landing = mongoose.model("Landing", landingSchema);
export default Landing;
