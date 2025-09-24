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
  },
  tags: [
    {
      type: String,
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
      lowerCase: true,
      trim: true,
    },
  ],
  visibleTestCases: [
    {
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
  starterCode: [
    {
      language: {
        type: String,
        requied: true,
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
