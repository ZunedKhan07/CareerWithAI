import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
    generatedContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);