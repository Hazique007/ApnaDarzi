import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";
import { redis } from "../redis/redisConfig.js"; // Import Redis configuration

// Add category data
export const addCategoryData = async (req, res) => {
  try {
    const { category, gender, categoryDescription } = req.body;

    const categoryImages = req.file?.filename;

    if (!category || !gender || !categoryImages) {
      return res.status(400).json({
        status: "error",
        message: "Category, gender, and categoryImages are required fields",
      });
    }

    const newCategory = new Category({
      category,
      gender,
      categoryImages,
      categoryDescription,
    });

    const savedCategory = await newCategory.save();

    // Invalidate the cache for categories
    await redis.del("categories");
    await redis.del(`categories:${gender}`);

    res.status(201).json({
      status: "success",
      message: "Category data added successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error occurred in adding category data:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while adding category data",
    });
  }
};

// Fetch categories with images
export const fetchCategoriesWithImages = async (req, res) => {
  try {
    const { gender } = req.query;

    // Check Redis cache first
    const cacheKey = gender ? `categories:${gender}` : "categories";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched categories with images (from cache)",
        categories: cachedData,
      });
    }

    console.log("Cache miss");
    let categories;
    if (gender) {
      categories = await Category.find({ gender });
    } else {
      categories = await Category.find({});
    }

    if (!categories.length) {
      return res.status(404).json({
        status: "error",
        message: "No categories found",
      });
    }

    await redis.set(cacheKey, JSON.stringify(categories), { ex: 3600 });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched categories with images",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching categories",
    });
  }
};

export const getGenderWiseCategory = async (req, res) => {
  const { gender } = req.query;

  if (!gender) {
    return res
      .status(400)
      .json({ message: "Gender query parameter is required." });
  }

  try {
    const cacheKey = `genderWiseCategory:${gender}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Categories and products retrieved successfully (from cache).",
        data: cachedData,
      });
    }

    console.log("Cache miss");
    const categories = await Category.find({ gender }).lean();

    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ message: `No categories found for gender: ${gender}.` });
    }

    const data = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find(
          {
            category: category.category,
          },
          "subCategory gender"
        ).lean();
        return {
          category: category.category,
          products,
        };
      })
    );

    await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 });

    res.status(200).json({
      message: "Categories and products retrieved successfully.",
      data,
    });
  } catch (error) {
    console.error("Error fetching categories and products:", error);
    res.status(500).json({
      message: "An error occurred while fetching data.",
      error: error.message,
    });
  }
};

export const deletedCategory = async (req, res) => {
  const { gender, category } = req.query;
  try {
    const deletedCategory = await Category.findOneAndDelete({
      gender: gender,
      category: category,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Successfully deleted",
      deletedCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
