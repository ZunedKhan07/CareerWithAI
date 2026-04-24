import asyncHandler from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { model } from "../config/geminiConfig.js"

const generateRoadmap = asyncHandler( async(req, res) => {
    const { stream, subjects, interests, grade } = req.body;

    if ([stream, subjects, interests, grade].some((field) => field?.trim() === "")) {
        throw new ApiErrors(400, "All Fields are required!")
    }

    const prompt = `I am a student in class ${grade}, ${stream} stream. My subjects are ${subjects} and interests are ${interests}. 
    Provide a professional career roadmap, preparation strategy, and a timeline for next 2-3 years.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    if (!response) {
        throw new ApiErrors(500, "AI connection id faild!");
    }

    return res.status(200).json(
        new ApiResponse(200, response, "Roadmap generated successfully!")
    )
});

const getOSOpportunities = asyncHandler( async(req, res) => {
    const { techStack } = req.body;

    if (!techStack) {
        throw new ApiErrors(400, "Tech stack is required (e.g. MERN, Python)!")
    }

    const prompt = `Suggest 5 beginner-friendly open-source organizations for ${techStack} with some space. 
    For each, provide: 1. Name 2. GitHub Link 3. Why it's good for beginners 4. Example labels like 'good-first-issue'.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    if (!response) {
        throw new ApiErrors(500, "AI connection id faild!")
    }

    return res.status(200).json(
        new ApiResponse(200, response, "OS Opportunities fetched!")
    )
})

export {
    generateRoadmap,
    getOSOpportunities
}