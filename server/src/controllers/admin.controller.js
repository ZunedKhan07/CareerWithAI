import {User} from "../models/user.model.js";
import {Roadmap} from "../models/roadmap.model.js";

export const getAdminStats = async (req, res) => {
  try {
    // 🔹 Total Users
    const totalUsers = await User.countDocuments();

    // 🔹 Total Roadmaps Generated
    const totalRoadmaps = await Roadmap.countDocuments();

    // 🔹 Latest 5 Users (password hide)
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    // 🔹 Latest 5 Roadmaps
    const latestRoadmaps = await Roadmap.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    // 🔹 Most Common Stream (Basic Analytics)
    const streamStats = await Roadmap.aggregate([
      {
        $group: {
          _id: "$stream",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.status(200).json({
      totalUsers,
      totalRoadmaps,
      mostCommonStream: streamStats[0]?._id || null,
      latestUsers,
      latestRoadmaps,
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({
      message: "Failed to fetch admin stats",
    });
  }
};