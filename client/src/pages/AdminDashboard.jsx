import React, { useEffect, useState } from "react";
import { getAdminStats } from "../api/index";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        alert("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        👑 Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 p-8 rounded-2xl text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-400">
            {stats.totalUsers}
          </h2>
          <p className="text-gray-400 mt-2">Total Users</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 p-8 rounded-2xl text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold text-green-400">
            {stats.totalRoadmaps}
          </h2>
          <p className="text-gray-400 mt-2">Total Roadmaps</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 p-8 rounded-2xl text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold text-purple-400">
            {stats.mostCommonStream || "N/A"}
          </h2>
          <p className="text-gray-400 mt-2">Most Popular Stream</p>
        </motion.div>
      </div>

      {/* Latest Users */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-8">
        <h3 className="text-xl font-semibold mb-4">🆕 Latest Users</h3>
        {stats.latestUsers.map((user) => (
          <div key={user._id} className="border-b border-gray-700 py-2">
            {user.name} - {user.email}
          </div>
        ))}
      </div>

      {/* Latest Roadmaps */}
      <div className="bg-gray-800 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">🧠 Latest Roadmaps</h3>
        {stats.latestRoadmaps.map((roadmap) => (
          <div key={roadmap._id} className="border-b border-gray-700 py-2">
            {roadmap.stream} - {roadmap.user?.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;