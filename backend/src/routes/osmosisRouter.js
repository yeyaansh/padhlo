import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import urlScrapper from "../controllers/urlScrapper.js";
import bulkScrapper from "../controllers/bulkScrapper.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const osmosisRouter = express.Router();

osmosisRouter.post("/url", userMiddleware, urlScrapper);

// bulkScrapper feature is under development
osmosisRouter.post("/bulkURL", adminMiddleware, bulkScrapper);

export default osmosisRouter;