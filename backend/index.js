import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbmongo from "./src/config/dbConnect.js";
import userAuth from "./src/routes/userAuth.js";
import redisClient from "./src/config/redisConnect.js";
import submitRouter from "./src/routes/userSubmission.js";
import problemRouter from "./src/routes/problemRouter.js";
import osmosisRouter from "./src/routes/osmosisRouter.js";
import playlistRouter from "./src/routes/playlistRouter.js";
import videoRouter from "./src/routes/videoRouter.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userAuth);
app.use("/problem", problemRouter);
app.use("/pid", submitRouter);
app.use("/osmosis", osmosisRouter);
app.use("/playlist", playlistRouter);
app.use("/video", videoRouter);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await Promise.all([dbmongo(), redisClient.connect()]);
    app.listen(PORT, () => {
      // app.listen(PORT, "0.0.0.0", () => {
      console.log("Server is Listening at Port No.: " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
