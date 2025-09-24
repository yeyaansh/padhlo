import jwt from "jsonwebtoken"
import redisClient from "../config/redisConnect.js";
import User from "../models/userSchema.js"
const adminMiddleware = async (req, res, next) => {
  try {
    // verify token is present or not
    const { token } = req.cookies;
    if(!token){
      throw new Error("Token is not present")
    }
    const payload = jwt.verify(token,process.env.JWT_KEY);
    const { role } = payload;
    // verify admin role
    if (role !== "admin") {
      throw new Error("It seems like you are not an Admin");
    }
    // check admin token in redis blacklist
    const isBlocked = await redisClient.exists(`user:token:blocked:${token}`);
    if (isBlocked) {
      throw new Error("Your token has been blocked, please log-in again...");
    }
    // if fine then check whether it (the admin) exists in db
    const {_id} = payload;
    const admin = await User.findById(_id);
    if(!admin){
      throw new Error("Admin doesn't exist")
    }
    // if everything is correct then push the data came from db into the request to use the data (and not load the server everytime)
    req.result = admin;

    next();
  } catch (err) {
    console.log("error during adminMiddleware "+err);
    res.status(401).send(err.message);
  }
};

export default adminMiddleware;
