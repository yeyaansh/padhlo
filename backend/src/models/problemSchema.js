import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  difficultyLevel: {
    type: String,
    enum: ["hard", "medium", "easy"],
    required: true,
    lowercase: true,
  },
  tags: [
    {
      type: String,
      lowercase: true,
      trim: true,
      enum: [
        "array",
        "linked-list",
        "tree",
        "graph",
        "dp",
        "recursion",
        "function",
        "divide-and-conquer",
        "other",
      ],
    },
  ],
  companies: [
    {
      type: String,
      lowercase: true,
      trim: true,
    },
  ],
  visibleTestCases: [
    {
      inputMessage: {
        type: String,
        required: true,
      },

      outputMessage: {
        type: String,
        required: true,
      },
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explaination: {
        type: String,
      },
    },
  ],
  hiddenTestCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],

  totalAttempts: {
    type: Number,
    default: 0,
  },
  totalSolved: {
    type: Number,
    default: 0,
  },
  acceptanceRate: {
    type: Number,
    default: 0,
  },

  starterCode: [
    {
      language: {
        enum: ["javascript", "cpp", "java", "python"],
        type: String,
        required: true,
      },
      initialCode: {
        type: String,
        required: true,
      },
    },
  ],
  referenceSolution: [
    {
      language: {
        enum: ["javascript", "cpp", "java", "python"],
        type: String,
        requied: true,
      },
      completeCode: {
        type: String,
        required: true,
      },
    },
  ],
  problemCreator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const problem = mongoose.model("problem", problemSchema);

export default problem;
