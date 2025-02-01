import express from "express";
import {
  addOrUpdatePersonalDetails,
  getPersonalDetails,
  editPersonalDetails,
  upload,
  uploadProfilePicture,
} from "../controllers/personalDetailsController.js";

const router = express.Router();

// Route to get personal details by userID
router.get("/listpersonal", getPersonalDetails);

//profile-pic

router.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  uploadProfilePicture
);

// Route to add or update personal details
router.post("/addOrUpdate", addOrUpdatePersonalDetails);

// Route to edit specific personal details
router.put("/edit/:userID", editPersonalDetails);

// Route to update personal details
// router.put("/update/:userID", updatePersonalDetails);

export default router;