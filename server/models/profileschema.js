import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true, // Ensures one profile per user
  //   ref: "Otp", // References a user model
  // },
  personalDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  addresses: [
    {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false },
    },
  ],
  // orders: [
  //   {
  //     orderId: { type: String, required: true },
  //     date: { type: Date, default: Date.now },
  //     status: { type: String, required: true, enum: ["Pending", "Shipped", "Delivered", "Cancelled"] },
  //     items: [
  //       {
  //         // : { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  //         quantity: { type: Number, required: true },
  //       },
  //     ],
  //   },
  // ],
  
  notifications: [
    {
      message: { type: String, required: true },
      type: { type: String, required: true, enum: ["Order", "Promotional", "System"] },
      date: { type: Date, default: Date.now },
      read: { type: Boolean, default: false },
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;


