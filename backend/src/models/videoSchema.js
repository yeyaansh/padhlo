import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    submissionId: {
      type: Schema.Types.ObjectId,
      ref: "problem",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    secureURL: {
      type: String,
      required: true,
    },
    thumbnailURL: {
      type: String,
    },
    duration: {
      type: String,
    },
    format: {
      type: String,
    },
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    tags: [{ type: String }],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    rating: { type: Number, default: 0 },
    comments: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const videoSolution = mongoose.model("videoSolution", videoSchema);

export default videoSolution;
