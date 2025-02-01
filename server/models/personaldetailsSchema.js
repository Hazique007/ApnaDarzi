import mongoose from "mongoose";

const personalDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
    ref: 'Otp',
    required: true,
  },
  mobileNumber: { type: String, required: true, ref: 'Otp' },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  age: { type: Number, required: true },
  emailAddress: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // Optional
});

const PersonalDetails = mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);
export default PersonalDetails;
