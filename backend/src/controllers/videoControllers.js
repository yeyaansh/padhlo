import { v2 as cloudinary } from "cloudinary";
import problem from "../models/problemSchema.js";
import User from "../models/userSchema.js";
import videoSolution from "../models/videoSchema.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateUploadSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    console.log("problemId: ", problemId, " adn userId: ", userId);

    // verify problem existent

    const problemExist = await problem.findById(problemId);
    if (!problemExist) {
      return res.status(404).json({
        success: false,
        message: "This Problem Id doesn't exist",
      });
    }

    // generate unique publicId for the video
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `leetcode-solution/${problemId}/${userId}_${timestamp}`;

    // upload parameters
    const uploadParams = {
      timestamp,
      public_id: publicId,
    };

    // generate signature
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    console.log("signature: ", signature);

    res.json({
      success: true,
      message: "Successfully generated Signature",
      signature,
      timestamp,
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate upload credentials",
    });
  }
};

const saveVideoMetadata = async (req, res) => {
  try {
    const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;

    const userId = req.result._id;

    // Verify the upload with Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      { resource_type: "video" }
    );

    if (!cloudinaryResource) {
      return res
        .status(400)
        .json({ success: false, message: "Video not found on Cloudinary" });
    }

    // Check if video already exists for this problem and user
    const existingVideo = await videoSolution.findOne({
      problemId,
      userId,
      cloudinaryPublicId,
    });

    if (existingVideo) {
      return res
        .status(409)
        .json({ success: false, message: "Video already exists" });
    }

    const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
      resource_type: "image",
      transformation: [
        { width: 400, height: 225, crop: "fill" },
        { quality: "auto" },
        { start_offset: "auto" },
      ],
      format: "jpg",
    });

    // Create video solution record
    const videoDataSaved = await videoSolution.create({
      submissionId: problemId,
      createdBy: req.result._id,
      cloudinaryPublicId,
      secureURL: secureUrl,
      duration: cloudinaryResource.duration || duration,
      thumbnailURL: thumbnailUrl,
    });

    const problemVideo = await problem.findById(problemId);
    problemVideo.videoURL = videoDataSaved._id;

    await problemVideo.save();

    res.status(201).json({
      success: true,
      message: "Video solution saved successfully",
      videoSolution: {
        id: videoSolution._id,
        thumbnailUrl: videoSolution.thumbnailURL,
        duration: videoSolution.duration,
        uploadedAt: videoSolution.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save video metadata" });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoID } = req.params;

    const video = await videoSolution.findByIdAndDelete({ _id: videoID });

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
      resource_type: "video",
      invalidate: true,
    });

    const removeURL = await problem.findOne({ videoURL: videoID });
    removeURL.videoURL = null;
    await removeURL.save();

    res.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to delete video" });
  }
};

export { generateUploadSignature, saveVideoMetadata, deleteVideo };
