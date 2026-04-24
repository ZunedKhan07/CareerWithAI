import Router from "express";
import { generateRoadmap, getOSOpportunities } from "../controllers/ai.controller.js";

const router = Router();

router.route("/generate-roadmap").post(generateRoadmap)
router.route("/find-os").post(getOSOpportunities)

export default router