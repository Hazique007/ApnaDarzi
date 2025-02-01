import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  otpExpiration: {
    type: Date,
    default: Date.now,
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => new Date(otpExpiration),
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'agent'],
    default: 'user', // Default value
  },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", userSchema);
export default Otp;
