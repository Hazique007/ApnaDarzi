import PersonalDetails from "../models/personaldetailsSchema.js";
import multer from "multer";
import path from "path";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/profile-pictures/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPEG, PNG, and JPG files are allowed."));
};
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Utility function to handle errors
const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

// Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID || !req.file) {
      return res
        .status(400)
        .json({ message: "User ID and profile picture are required" });
    }

    const profilePicturePath = req.file.path;
    const user = await PersonalDetails.findOneAndUpdate(
      { userID },
      { profilePicture: profilePicturePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile picture uploaded successfully", data: user });
  } catch (error) {
    handleError(res, error, "Error uploading profile picture");
  }
};

// Add or Update Personal Details
export const addOrUpdatePersonalDetails = async (req, res) => {
  try {
    const { userID, ...profileData } = req.body;
    const userDetails = await PersonalDetails.findOneAndUpdate(
      { userID },
      profileData,
      { new: true, upsert: true }
    );
    res.status(userDetails.isNew ? 201 : 200).json(userDetails);
  } catch (error) {
    handleError(res, error, "Error adding/updating personal details");
  }
};

// Fetch Personal Details
export const getPersonalDetails = async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userDetails = await PersonalDetails.find({ userID });
    if (!userDetails.length) {
      return res.status(404).json({ message: "No details found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    handleError(res, error, "Error fetching personal details");
  }
};

// Edit Personal Details
export const editPersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetails = await PersonalDetails.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedDetails) {
      return res.status(404).json({ message: "Details not found" });
    }

    res.status(200).json(updatedDetails);
  } catch (error) {
    handleError(res, error, "Error editing personal details");
  }
};