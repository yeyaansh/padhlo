import mongoose, { Schema } from "mongoose";

const playlistContainerSchema = new Schema(
  {
    playlistCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    playlistName: {
      type: String,
      trim: true,
      default: "Solve Later",
      minLength: 3,
      required: true,
    },
    playlistDescription: {
      type: String,
      trim: true,
      minLength: 5,
      default: "This is the playlist description...",
    },
    problemStore: [
      {
        type: Schema.Types.ObjectId,
        ref: "problem",
      },
    ],
    playlistProfileImage: {
      type: String,
      trim: true,
      default: "https://picsum.photos/200",
    },
    playlistCoverImage: {
      type: String,
      trim: true,
      default: "https://picsum.photos/1024/576",
    },
    isPlaylistPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const playlistContainer = mongoose.model(
  "playlistContainer",
  playlistContainerSchema
);

export default playlistContainer;
