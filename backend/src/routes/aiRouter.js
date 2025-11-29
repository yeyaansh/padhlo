import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { aiProblemHint } from "../controllers/aiController.js";
const aiRouter = express.Router();

aiRouter.post("/hints", userMiddleware, aiProblemHint);

export default aiRouter;
