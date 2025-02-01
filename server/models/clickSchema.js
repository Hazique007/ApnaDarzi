import mongoose from "mongoose";
const clickSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Click = mongoose.model("Click", clickSchema);
export default Click;
