import mongoose, { Schema } from "mongoose";
const osmosisURLSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    problemSourcedFrom: {
      type: String,
      required: true,
    },
    companyTags: [
      {
        type: String,
        default: null,
      },
    ],
    topicTags: [
      {
        type: String,
        trim:true,
        default: null,
      },
    ],
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: null,
    },
    problemUrl: {
      type: String,
      required: true,
    },
    
    popularSheets: [
      {
        type: String,
        default: null,
      },
    ],
    videoSolution: [{
      type: String,
      default: null,
    }],
    explicitTag: [
      {
        type: String,
        default: null,
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

const osmosisURL = mongoose.model("osmosisURL", osmosisURLSchema);

export default osmosisURL;
