import jwt from "jsonwebtoken"
import redisClient from "../config/redisConnect.js"
import User from "../models/userSchema.js"
const userMiddleware = async (req, res, next) => {
  try {
    // check incoming token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not present");
    }
    // verifying the token
    const payload = jwt.verify(token, process.env.JWT_KEY);

    // if everything is correct but the token is blocked in redisClient then don't give the access to do any operation.
    const isBlocked = await redisClient.exists(`user:token:blocked:${token}`);
    if (isBlocked) {
      throw new Error("Your token has been blocked, please log-in again...");
    }
    // everything is fine
    const { _id } = payload;
    // find the user data in db using _id
    const result = await User.findById(_id);
    if(!result){
      res.status(400).send("User Doesn't Exist");
    }

    // send the data fetched from db with the request to avoid calling the db multiple times to fetch the same data
    req.result = result;
    next();
  } catch (err) {
    console.log("error in userMiddleware " + err);
    res.status(401).send("Invalid Token");
  }
};

export default userMiddleware;
