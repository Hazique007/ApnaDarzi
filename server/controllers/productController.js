import Product from "../models/productSchema.js";
import Category from "../models/categorySchema.js";
import { log } from "console";

import { redis } from "../redis/redisConfig.js";

export const getSpecificProducts = async (req, res) => {
  try {
    const { gender, category, subCategory, fabric, size, color } = req.query;

    const filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (fabric) filter.fabric = fabric;
    if (size) filter.size = size;
    if (color) filter.color = color;

    const sort = { price: 1 };

    const cacheKey = `specificProducts:${JSON.stringify(req.query)}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Successfully fetched products (from cache).",
        products: cachedData,
      });
    }

    console.log("Cache miss");

    const products = await Product.find(filter).sort(sort);

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for the given criteria.",
      });
    }

    await redis.set(cacheKey, JSON.stringify(products), { ex: 3600 });

    return res.status(200).json({
      message: "Successfully fetched products.",
      products,
    });
  } catch (error) {
    console.error("Error occurred in getSpecificProducts:", error.message);

    return res.status(500).json({
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const { gender, category } = req.query;
    let filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;

    const cacheKey = `productsByCategory:${JSON.stringify(req.query)}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Successfully fetched products (from cache).",
        products: cachedData,
      });
    }

    console.log("Cache miss");

    const products = await Product.find(filter);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given criteria." });
    }

    await redis.set(cacheKey, JSON.stringify(products), { ex: 3600 });

    res.status(200).json({
      message: "Successfully fetched products",
      products,
    });
  } catch (error) {
    console.error("Error occurred in getByCategory:", error);
    res.status(500).json({ message: "Error in fetching products" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const cacheKey = "allCategories";

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Successfully fetched categories (from cache).",
        categories: cachedData,
      });
    }

    console.log("Cache miss");

    const categories = await Product.distinct("category");

    await redis.set(cacheKey, JSON.stringify(categories), { ex: 3600 });

    res.status(200).json({ message: "Got it!! 👌", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

export const getGenderWiseCategory = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    const cacheKey = `genderWiseCategory:${gender}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Categories retrieved successfully (from cache).",
        categories: cachedData,
      });
    }

    console.log("Cache miss");

    const genderWiseCategories = await Product.aggregate([
      { $match: { gender } },
      { $group: { _id: "$category", images: { $push: "$images" } } },
    ]);

    await redis.set(cacheKey, JSON.stringify(genderWiseCategories), {
      ex: 3600,
    });

    res
      .status(200)
      .json({ message: "Got IT", categories: genderWiseCategories });
  } catch (error) {
    console.error("Error fetching gender-wise categories:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch gender-wise categories", error });
  }
};

export const getAllCategoryWithImages = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const cacheKey = `categoriesWithImages:${category}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Successfully fetched categories with images (from cache).",
        categoriesWithImages: cachedData,
      });
    }

    console.log("Cache miss");

    const categoriesWithImages = await Product.find(
      { category },
      { subCategory: 1, _id: 0 }
    );

    await redis.set(cacheKey, JSON.stringify(categoriesWithImages), {
      ex: 3600,
    });

    res.status(200).json({
      message: "Got it!! 👌",
      categoriesWithImages,
    });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    res.status(500).json({
      message: "Failed to fetch categories with images",
      error,
    });
  }
};

export const getSubcategory = async (req, res) => {
  const { gender, category } = req.query;

  if (!gender) {
    return res.status(400).json({
      message: "Gender query parameter is required.",
    });
  }

  try {
    const query = { gender };
    if (category) {
      query.category = category;
    }

    const cacheKey = `subCategories:${JSON.stringify(req.query)}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Subcategories retrieved successfully (from cache).",
        subCategories: cachedData,
      });
    }

    console.log("Cache miss");

    const data = await Product.find(query, {
      subCategory: 1,
      _id: 0,
      gender,
    }).lean();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No subcategories found for the specified query.",
      });
    }

    const subCategories = data.map((item) => item.subCategory);

    await redis.set(cacheKey, JSON.stringify(subCategories), { ex: 3600 });

    res.status(200).json({
      message: "Subcategories retrieved successfully.",
      subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      message: "An error occurred while fetching subcategories.",
      error: error.message,
    });
  }
};

export const getGenderPlusCategory = async (req, res) => {
  try {
    const { gender, category } = req.query;

    if (!gender || !category) {
      return res.status(400).json({
        success: false,
        message: "Gender and category are required to fetch products.",
      });
    }

    const cacheKey = `productsByGenderAndCategory:${JSON.stringify(req.query)}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        success: true,
        message: "Products successfully retrieved (from cache).",
        products: cachedData,
      });
    }

    console.log("Cache miss");

    const products = await Product.find({ gender, category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified gender and category.",
      });
    }

    await redis.set(cacheKey, JSON.stringify(products), { ex: 3600 });

    res.status(200).json({
      success: true,
      message: "Products successfully retrieved.",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

export const getFabricGenderPlusCategory = async (req, res) => {
  const { gender, category } = req.query;

  if (!gender || !category) {
    return res.status(400).json({
      message: "Both gender and category query parameters are required.",
    });
  }

  try {
    const cacheKey = `fabricsByGenderAndCategory:${JSON.stringify(req.query)}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        message: "Fabrics retrieved successfully (from cache).",
        data: cachedData,
      });
    }

    console.log("Cache miss");

    const products = await Product.find({ gender, category }).lean();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: `No products found for gender: ${gender} and category: ${category}.`,
      });
    }

    const fabrics = [...new Set(products.map((product) => product.fabric))];

    await redis.set(cacheKey, JSON.stringify(fabrics), { ex: 3600 });

    res.status(200).json({
      message: "Fabrics retrieved successfully.",
      data: fabrics,
    });
  } catch (error) {
    console.error("Error fetching fabrics:", error);
    res.status(500).json({
      message: "An error occurred while fetching fabrics.",
      error: error.message,
    });
  }
};

export const GenderCategorySubcategory = async (req, res) => {
  const { gender, category, subCategory } = req.query;
  if (!gender || !category || !subCategory) {
    return res
      .status(400)
      .json({ message: "All three parameters are required" });
  }

  const products = await Product.find({
    gender: gender,
    category: category,
    subCategory: subCategory,
  });
  if (products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for the given criteria." });
  }
  res.status(200).json({ message: "Successfully fetched products", products });
};

export const UpdateGenderCategorySubcategory = async (req, res) => {
  const { gender, category, subCategory } = req.query;

  const images = req.files ? req.files.map((file) => file.filename) : [];

  if (!gender || !category || !subCategory) {
    return res.status(400).json({
      message:
        "All three parameters (gender, category, subCategory) are required",
    });
  }

  const validGenders = ["Male", "Female", "General"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      message:
        "Invalid gender value. It must be one of the following: Male, Female, General",
    });
  }

  try {
    const product = await Product.findOne({ gender, category, subCategory });

    if (!product) {
      return res.status(404).json({
        message:
          "No product found with the given gender, category, and subCategory",
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { gender, category, subCategory },
      {
        ...req.body,
        images: images.length > 0 ? images : product.images,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
};

export const CategorySubcategoryDelete = async (req, res) => {
  const { gender, category, subCategory } = req.query;
  if (!gender || !category || !subCategory) {
    return res
      .status(400)
      .json({ message: "All three parameters are required" });
  }
  try {
    const deletedProduct = await Product.findOneAndDelete({
      gender: gender,
      category: category,
      subCategory: subCategory,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found for the given criteria" });
    } else {
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};

export const GenderCategory = async (req, res) => {
  const { gender, category } = req.query;
  if (!gender || !category) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  try {
    const products = await Category.find({
      gender: gender,
      category: category,
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given criteria." });
    }

    res
      .status(200)
      .json({ message: "Successfully fetched products", products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching products" });
  }
};

export const UpdateGenderCategory = async (req, res) => {
  const { gender, category } = req.query;
  const image = req.file?.filename;

  console.log(req.file?.filename);

  if (!gender && !category && !image) {
    return res.status(400).json({
      message: "All parameters (gender, category, image) are required",
    });
  }

  const validGenders = ["Male", "Female", "General"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      message:
        "Invalid gender value. It must be one of the following: Male, Female, General",
    });
  }

  try {
    // Update category data
    const updatedProduct = await Category.findOneAndUpdate(
      { gender, category },
      { ...req.body, categoryImages: image },
      { new: true }
    );

    // Update product descriptions
    const updateProductDescription = await Product.updateMany(
      { gender, category },
      { categoryDescription: req.body.categoryDescription },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "No product found with the given gender and category",
      });
    }

    // Invalidate Redis cache
    try {
      await redis.del("categories");
      await redis.del(`categories:${gender}`);
    } catch (redisError) {
      console.error("Redis error:", redisError);
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};

export const CategoryDelete = async (req, res) => {
  const { gender, category } = req.query;
  if (!gender || !category) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  try {
    const deletedProduct = await Category.findOneAndDelete({
      gender: gender,
      category: category,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found for the given criteria" });
    } else {
      await redis.del("categories");
      await redis.del(`categories:${gender}`);

      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      price,
      gender,
      description,
      stock,
      highlight,
    } = req.body;

    const images = req.files.map((file) => file.filename);
    console.log(req.body);

    const categoryData = await Category.findOne({ gender, category });
    console.log(categoryData);

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      category,
      subCategory,
      stock,
      price,
      highlight,
      images,
      gender,
      description,
      categoryDescription: categoryData.categoryDescription,
    });
    console.log(newProduct);

    const savedProduct = await newProduct.save();

    await redis.del("categories");
    await redis.del(`categories:${gender}`);

    return res.status(201).json({
      message: "Subcategory added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
