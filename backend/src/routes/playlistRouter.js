import express from "express"
import userMiddleware from "../middleware/userMiddleware.js";
import { fetchPlaylistById, createPlaylist, addProblemToPlaylist, fetchAllPlaylist } from "../controllers/playlistOperation.js";

const playlistRouter = express.Router();

playlistRouter.get("/id/:playlistId",userMiddleware,fetchPlaylistById);
playlistRouter.post("/create",userMiddleware,createPlaylist);
playlistRouter.post("/addProblemToPlaylist",userMiddleware,addProblemToPlaylist);
playlistRouter.get("/all",userMiddleware,fetchAllPlaylist)

export default playlistRouter;