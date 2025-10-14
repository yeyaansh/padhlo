import express from "express"
const problemRouter = express.Router();
import {
  createProblem,
  updateProblem,
  deleteProblemById,
  fetchProblemById,
  fetchAllProblem,
  uniqueSolvedProblems,
  problemAttemptedById,
  problemAttemptedByUser
} from "../controllers/problemRouterFunctions.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import userMiddleware from "../middleware/userMiddleware.js"
// only admin have this power
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware, deleteProblemById);

// // both have this power
problemRouter.get("/id/:id",userMiddleware, fetchProblemById);
problemRouter.get("/all",userMiddleware, fetchAllProblem);

// // user have this power
problemRouter.get("/uniqueSolvedProblems",userMiddleware, uniqueSolvedProblems);
problemRouter.get("/problemAttemptedById/:id",userMiddleware,problemAttemptedById);
problemRouter.get("/problemAttemptedByUser",userMiddleware,problemAttemptedByUser);
export default problemRouter;