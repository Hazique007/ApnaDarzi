import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import fs from "fs";
import {
  addLandingPageImages,
  getLandingPageImages,
  // updateLandingPageImages,
} from "../controllers/landingController.js";
import {
  addTrendingImages,
  getTrendingPageImages,
} from "../controllers/trendingController.js";
import {
  addFashionImages,
  getFashionPageImages,
} from "../controllers/fashionController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/addLandingPageImages",
  upload.array("image", 4),
  addLandingPageImages
);

router.get("/getLandingPageImages", getLandingPageImages);
// router.put("/updateLandingPageImages", updateLandingPageImages);

router.post(
  "/addTrendingImages",
  upload.array("trendingImages", 4),
  addTrendingImages
);

router.get("/getTrendingPageImages", getTrendingPageImages);

router.post(
  "/addFashionImages",
  upload.array("fashionImages", 10),
  addFashionImages
);

router.get("/getFashionPageImages", getFashionPageImages);

export default router;
