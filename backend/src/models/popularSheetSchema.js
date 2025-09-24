import mongoose, { Schema } from "mongoose";

const popularSheetsSchema = new Schema(
  {
    sheetTitle: {
      type: String,
      required: true,
    },

    sheetThumbnail:{
      type:String,
      default:null
    },

    sheetData: [
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
        platformLogo: {
          type: String,
          default: null,
        },
        videoSolution:[ {
          type: String,
          default: null,
        }],
        explicitTag: [
          {
            type: String,
            default: null,
          },
        ],
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

const problemCollection = mongoose.model(
  "problemCollection",
  popularSheetsSchema
);

export default problemCollection;
