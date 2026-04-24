import express from "express";
import verifyJWT from "../middlewares/varifyJWT.middleware.js";
import verifyAdmin from "../middlewares/varifyAdmin.middleware.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

/*
   Route:   GET /api/v1/admin/stats
   Access:  Private (Admin Only)
   Purpose: Get dashboard analytics data
*/

router.get(
  "/stats",
  verifyJWT,     // 🔐 Check if logged in
  verifyAdmin,   // 👑 Check if role === admin
  getAdminStats  // 📊 Send analytics
);

export default router;