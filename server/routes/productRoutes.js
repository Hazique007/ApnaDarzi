import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { checkRole } from "../middlewares/checkrole.js";
import path from "path";
import fs from "fs";
import {
  // getAllProducts,
  // getProductsGenderWise,
  getSpecificProducts,
  getAllCategory,
  getAllCategoryWithImages,
  getGenderWiseCategory,
  getSubcategory,
  getGenderPlusCategory,
  GenderCategorySubcategory,
  UpdateGenderCategorySubcategory,
  CategorySubcategoryDelete,
  GenderCategory,
  UpdateGenderCategory,
  CategoryDelete,
  addSubCategory,
  // getProductsGenderandCategoryWise,
} from "../controllers/productController.js";
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

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isMimeTypeValid = allowedTypes.test(file.mimetype);
  const isExtNameValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isMimeTypeValid && isExtNameValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/allProducts", getSpecificProducts);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllCategoryWithImages", getAllCategoryWithImages);
router.get("/getGenderWiseCategory", getGenderWiseCategory);
router.get("/getSubcategory", getSubcategory);
router.get("/getGenderPlusCategory", getGenderPlusCategory);
router.get("/GenderCategorySubcategory", GenderCategorySubcategory);
router.put(
  "/UpdateGenderCategorySubcategory",
  checkRole,
  upload.array("images"),
  UpdateGenderCategorySubcategory
);
router.delete("/CategorySubcategoryDelete",checkRole, CategorySubcategoryDelete);
router.get("/GenderCategory", GenderCategory);
router.put(
  "/UpdateGenderCategory",checkRole,
  upload.single("image"),
  UpdateGenderCategory
);
router.delete("/CategoryDelete",checkRole, CategoryDelete);
router.post("/add-subcategory",checkRole, upload.array("images"), addSubCategory);

export default router;
