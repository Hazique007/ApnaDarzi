import Fashion from "../models/fashionSchema.js";
import { redis } from "../redis/redisConfig.js"; // Import Redis configuration

// Add fashion images with category and gender
export const addFashionImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No images uploaded. Please upload at least one image.",
      });
    }

    const { category, gender } = req.body;
    if (!category || !gender) {
      return res.status(400).json({
        status: "error",
        message: "Both category and gender are required for fashion images.",
      });
    }

    // Ensure that gender is one of the accepted values (Male, Female, Unisex)
    if (!["Male", "Female", "Unisex"].includes(gender)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid gender. Accepted values are Male, Female, or Unisex.",
      });
    }

    // Create an array of fashion images with category and gender
    const fashionItems = req.files.map((file) => ({
      fashionImage: file.filename,
      category,
      gender,
    }));

    const newFashion = new Fashion({
      fashionImages: fashionItems,
    });

    const savedFashion = await newFashion.save();

    // Invalidate the Redis cache for fashion images after adding new data
    await redis.del("fashionPageImages");

    res.status(201).json({
      status: "success",
      message: "Fashion images added successfully",
      data: savedFashion,
    });
  } catch (error) {
    console.error("Error adding Fashion images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding Fashion images. Please try again later.",
    });
  }
};

// Fetch all fashion images with categories and gender
export const getFashionPageImages = async (req, res) => {
  try {
    // Check Redis cache first
    console.log("Checking cache for fashion images");

    const cachedData = await redis.get("fashionPageImages");
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched fashion images (from cache)",
        data: cachedData, // Parse the cached JSON string
      });
    }

    console.log("Cache miss");
    // Fetch data from MongoDB
    const fashionData = await Fashion.find({});

    if (!fashionData.length) {
      return res.status(404).json({
        status: "error",
        message: "No fashion data found",
      });
    }

    // Flatten the results to return a simple array of images with categories and gender
    const imagesWithCategoriesAndGender = fashionData.flatMap((fashionItem) =>
      fashionItem.fashionImages.map((item) => ({
        fashionImage: item.fashionImage,
        category: item.category,
        gender: item.gender, // Include gender in the response
      }))
    );

    // Store data in Redis with an expiration time of 1 hour (3600 seconds)
    await redis.set(
      "fashionPageImages",
      JSON.stringify(imagesWithCategoriesAndGender),
      { EX: 3600 }
    );

    res.status(200).json({
      status: "success",
      message: "Successfully fetched fashion images",
      data: imagesWithCategoriesAndGender,
    });
  } catch (error) {
    console.error("Error fetching Fashion images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching Fashion images",
    });
  }
};
