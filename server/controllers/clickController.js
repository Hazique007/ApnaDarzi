import Click from "../models/clickSchema.js";

export const trackClick = async (req, res) => {
  const { gender, category } = req.body;
  try {
    await Click.create({ gender, category });
    res
      .status(200)
      .json({ success: true, message: "Click tracked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error tracking click" });
  }
};

export const getClickStats = async (req, res) => {
  try {
    const stats = await Click.aggregate([
      {
        $group: {
          _id: { gender: "$gender", category: "$category" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
};
