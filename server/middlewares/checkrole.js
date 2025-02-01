import Otp from "../models/userSchema.js";

export const checkRole = async (req, res, next) => {
  try {
    const { userID } = req.query;

    const user = await Otp.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: "You are not an admin" });
    }

    next();
  } catch (error) {
    console.error("Error in checkRole middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
