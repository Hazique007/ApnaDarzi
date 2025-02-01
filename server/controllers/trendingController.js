import Trending from "../models/trendingSchema.js";
import { redis } from "../redis/redisConfig.js";
export const addTrendingImages = async (req, res) => {
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
        message: "Both category and gender are required for trending images.",
      });
    }

    // Ensure that gender is one of the accepted values (Male, Female, Unisex)
    if (!["Male", "Female", "Unisex"].includes(gender)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid gender. Accepted values are Male, Female, or Unisex.",
      });
    }

    const trendingItems = req.files.map((file) => ({
      trendingImage: file.filename,
      category,
      gender,
    }));

    if (trendingItems.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid images uploaded. Please upload valid image files.",
      });
    }

    const newTrending = new Trending({
      trendingItems,
    });

    const savedTrending = await newTrending.save();

    // Clear the Redis cache for trending page images after adding new data
    await redis.del("trendingPageImages");

    res.status(201).json({
      status: "success",
      message: "Trending page images added successfully",
      savedTrending,
    });
  } catch (error) {
    console.error("Error adding Trending page images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding Trending page images. Please try again later.",
    });
  }
};

// Fetch all trending images with their categories and gender
export const getTrendingPageImages = async (req, res) => {
  try {
    // Check Redis cache first
    const cachedData = await redis.get("trendingPageImages");
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched Trending page images (from cache)",
        data: cachedData,
      });
    }

    console.log("Cache miss");
    // Fetch data from MongoDB
    const trendingData = await Trending.find({});

    if (!trendingData.length) {
      return res.status(404).json({
        status: "error",
        message: "No Trending page data found",
      });
    }

    const formattedData = trendingData.flatMap((item) =>
      item.trendingItems.map((trendingItem) => ({
        trendingImage: trendingItem.trendingImage,
        category: trendingItem.category,
        gender: trendingItem.gender, // Include gender in the response
      }))
    );

    // Store data in Redis with an expiration time of 1 hour (3600 seconds)
    await redis.set("trendingPageImages", JSON.stringify(formattedData), {
      ex: 3600,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched Trending page images",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching Trending page images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching Trending page images",
    });
  }
};
