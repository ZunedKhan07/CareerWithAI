import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoadmapForm from "../components/Roadmap";
import OSExplorer from "../components/OSExplorer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AceHack Career AI
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Choose your path to excellence
        </p>
      </motion.header>

      {/* Selection Cards */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {/* Roadmap Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("roadmap")}
          className={`cursor-pointer p-8 rounded-2xl border ${
            activeTab === "roadmap"
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-700 bg-gray-800"
          } transition-all w-80 text-center`}
        >
          <h2 className="text-2xl font-bold">🗺️ Career Roadmap</h2>
          <p className="text-sm text-gray-400 mt-2">
            Get personalized AI guidance for your future.
          </p>
        </motion.div>

        {/* OS Explorer Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("os")}
          className={`cursor-pointer p-8 rounded-2xl border ${
            activeTab === "os"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-gray-700 bg-gray-800"
          } transition-all w-80 text-center`}
        >
          <h2 className="text-2xl font-bold">🚀 OS Explorer</h2>
          <p className="text-sm text-gray-400 mt-2">
            Find beginner-friendly open-source projects.
          </p>
        </motion.div>
      </div>

      {/* Dynamic Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "roadmap" && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <RoadmapForm />
            </motion.div>
          )}

          {activeTab === "os" && (
            <motion.div
              key="os"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OSExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;