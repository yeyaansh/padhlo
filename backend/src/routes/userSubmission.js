import express from "express"
import userMiddleware from "../middleware/userMiddleware.js"
import {submitCodeFunction,runCodeFunction} from "../controllers/userSubmissionFunction.js"
const submitRouter = express.Router();

submitRouter.post("/submit/:id", userMiddleware,submitCodeFunction);
submitRouter.post("/run/:id", userMiddleware,runCodeFunction);

export default submitRouter;