import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      trim: true,
      lowerCase: true,
      required: true,
      default: "other",
    },

    age: {
      type: Number,
      min: 8,
      max: 80,
    },

    email_id: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
      trim: true,
      immutable: true,
    },
    avatarURL:{
      type:String,
      default:'https://avatar.iran.liara.run/public/boy',
      trim:true,
    },
    problemSolved: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "problem",
          // unique:true
        },
      ],
    },
    totalAttempts: {
      type: Number,
      default: 0,
    },
    acceptanceRate: {
      type: Number,
      default: 0,
    },
    playlist: [
      {
        playlistId: {
          type: Schema.Types.ObjectId,
          ref: "playlistContainer",
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
