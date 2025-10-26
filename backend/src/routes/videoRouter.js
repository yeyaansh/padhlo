import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { deleteVideo, generateUploadSignature, saveVideoMetadata } from "../controllers/videoControllers.js";
const videoRouter = express.Router();

videoRouter.get("/create/:problemId", adminMiddleware, generateUploadSignature);
videoRouter.post("/save", adminMiddleware, saveVideoMetadata);
videoRouter.delete("/delete/:videoID", adminMiddleware, deleteVideo);

export default videoRouter;
