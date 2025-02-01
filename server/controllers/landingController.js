import Landing from "../models/landingSchema.js";
import { redis } from "../redis/redisConfig.js";

export const addLandingPageImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No banner images uploaded. Please upload at least one image.",
      });
    }

    const { gender, category } = req.body;
    if (!gender || !category) {
      return res.status(400).json({
        status: "error",
        message: "Both gender and category fields are required.",
      });
    }

    const bannerImages = req.files.map((file) => ({
      image: file.filename,
      gender,
      category,
    }));

    const newLanding = new Landing({
      bannerImages,
    });

    const savedLanding = await newLanding.save();

    await redis.del("landingPageImages");

    res.status(201).json({
      status: "success",
      message: "Landing page images added successfully",
      data: savedLanding,
    });
  } catch (error) {
    console.error("Error adding landing page images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding landing page images. Please try again later.",
    });
  }
};

export const getLandingPageImages = async (req, res) => {
  try {
    const cachedData = await redis.get("landingPageImages");
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched landing page images (from cache)",
        data: cachedData,
      });
    }

    console.log("Cache miss");
    const landingData = await Landing.find({});
    if (!landingData.length) {
      return res.status(404).json({
        status: "error",
        message: "No landing page data found",
      });
    }

    const formattedData = landingData.map((item) => ({
      bannerImages: item.bannerImages.map((image) => ({
        image: image.image,
        gender: image.gender,
        category: image.category,
      })),
    }));

    // Store data in Redis with an expiration time of 1 hour (3600 seconds)
    await redis.set("landingPageImages", JSON.stringify(formattedData), {
      ex: 3600,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched landing page images",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching landing page images:", error);

    res.status(500).json({
      status: "error",
      message: "Server error while fetching landing page images",
    });
  }
};
