import validate from "../utils/vaildate.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import genCookie from "../utils/genCookie.js";
import expireCookie from "../utils/expireCookie.js";
import jwt from "jsonwebtoken";
import submission from "../models/userSubmissionSchema.js";
import playlistContainer from "../models/playlistContainerSchema.js";
import osmosisURL from "../models/urlSchema.js";
import osmosisProblemCollection from "../models/popularSheetSchema.js";
import axiosClient from "../../../frontend/src/axiosClient/index.js";
import problem from "../models/problemSchema.js";

//checkAuth function
const checkAuth = async (req, res) => {
  try {
    const reply = {
      _id: req.result._id,
      email_id: req.result.email_id,
      first_name: req.result.first_name,
      last_name: req.result.last_name,
      role: req.result.role,
    };

    return res.status(200).json({
      result: reply,
      message: "user is already logged-in!",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

// register function
const register = async (req, res) => {
  try {
    // validate the data on API level
    validate(req.body);
    console.log("body is: ", req.body);

    const doUserExist = await User.findOne({ email_id: req.body.email_id });
    if (doUserExist) {
      // console.log("user already exist babu...");

      return res.send({
        success: false,
        message: "This user already exist!",
      });
    }
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "user";
    const newUser = await User.create(req.body);

    const defaultPlaylist = await playlistContainer.create({
      playlistCreator: newUser._id,
    });

    newUser.playlist.push(defaultPlaylist._id);

    await newUser.save();

    // generate token
    const token = genCookie(newUser);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    const reply = {
      _id: newUser._id,
      email_id: newUser.email_id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      role: newUser.role,
    };
    console.log("reply value on backend");

    console.log(reply);

    res.status(201).send({
      result: reply,
      success: true,
      message: "account created successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      result: null,
      success: false,
      message: `${err.message}`,
    });
  }
};
// login function
const login = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id) throw new Error("email_id can't be empty");
    if (!password) throw new Error("Password can't be empty");
    const existingUser = await User.findOne({ email_id });
    if (!existingUser) throw new Error("Invalid Credentials");
    const validUser = await bcrypt.compare(password, existingUser.password);
    if (!validUser) throw new Error("Invalid Credentials");

    // if valid user then pass the data came from db to generate cookie
    const token = genCookie(existingUser);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    const reply = {
      _id: existingUser._id,
      email_id: existingUser.email_id,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      role: existingUser.role,
    };
    console.log("reply value on backend");

    console.log(reply);

    res.status(200).send({
      result: reply,
      success: true,
      message: "account logged-in successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: `${err.message}`,
    });
  }
};
// logout function
const logout = async (req, res) => {
  try {
    // decode the cookie
    const payload = jwt.decode(req.cookies.token);
    const { exp } = payload;
    // calling expireCookie function and passing token and expiry time (in ms from EPOCH time)
    await expireCookie(req.cookies.token, exp);
    // clear cookie
    // res.cookie("token",null, new Date(Date.now()));
    res.clearCookie("token");
    res.status(200).send({
      success: true,
      message: "Successfully LoggedOut",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: `${err.message}`,
    });
  }
};
// getInfo function
const getProfile = async (req, res) => {
  try {
    // Since we had verified everything in userMiddleware and passed the data with request as result, so we can fetch it from there
    // const userData = req.result;
    const userData = await User.findById(req.result._id).populate(
      "problemSolved playlist"
    );

    console.log(userData);

    // const payload = jwt.decode(req.cookies.token);
    // const { _id } = payload;
    // const userData = await User.findById(_id);
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).send("error during getProfile " + err.message);
  }
};
// admin register function // admin can create accounts for the user and for admins also
const adminRegister = async (req, res) => {
  try {
    // validate the data on API level // check if data is correct or not
    validate(req.body);
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;
    if (!role) {
      throw new Error("Please mention the role");
    }

    // create account and store it in db
    const newUser = await User.create(req.body);

    if (!newUser) {
      throw new Error("Error in server while creating the account");
    }
    // since the admin is creating accounts for others so it do not need to get signed in from the newly created account, so we don't create cookie, we just send an acknowledgement to the admin that the user or admin account has been created successfully

    // const token = genCookie(newUser);
    // res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(200).send("Successfully Created");
  } catch (err) {
    console.log("error during creating accounts by admin " + err);
    res.status(400).send(err.message);
  }
};
// admin-login function
const adminLogin = async (req, res) => {
  try {
    const { email_id, password, role } = req.body;
    if (!email_id) throw new Error("email_id can't be empty");
    if (!password) throw new Error("Password can't be empty");
    if (!role) throw new Error("Invalid Credentials");
    const existingUser = await User.findOne({ email_id });
    if (!existingUser) throw new Error("Invalid Credentials");
    const validUser = await bcrypt.compare(password, existingUser.password);
    if (!validUser) throw new Error("Invalid Credentials");
    if (existingUser.role != "admin") throw new Error("Invalid Credentials");

    // if valid user then pass the data came from db to generate cookie
    const token = genCookie(existingUser);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    const reply = {
      _id: existingUser._id,
      email_id: existingUser.email_id,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      role: existingUser.role,
    };
    console.log("reply value on backend");

    console.log(reply);

    res.status(200).send({
      result: reply,
      success: true,
      message: "Admin account logged-in successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      result: null,
      success: false,
      message: `${err.message}`,
    });
  }
};
const createdProblemList = async (req, res) => {
  try {
    const { _id } = req.result;

    const problemsArray = await problem.find({ problemCreator: _id });

    if (!problemsArray.length)
      return res.status(400).json({
        success: false,
        result: null,
        message: "You haven't created any playlist yet!",
      });

    const reply = problemsArray;
    console.log("sending all problems created by admin: ");

    console.log(reply);

    res.status(200).send({
      result: reply,
      success: true,
      message: "All created-problems fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      result: null,
      success: false,
      message: `${err.message}`,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    // decode the cookie
    const payload = jwt.decode(req.cookies.token);
    const { exp } = payload;

    const userId = req.result._id;

    await Promise.all([
      await User.findByIdAndDelete(userId),
      await submission.deleteMany(userId),
      await osmosisURL.deleteMany({ createdBy: userId }),
      await osmosisProblemCollection.deleteMany({ createdBy: userId }),
      await playlistContainer.deleteMany({ playlistCreator: userId }),
    ]);

    // calling expireCookie function and passing token and expiry time (in ms from EPOCH time)
    await expireCookie(req.cookies.token, exp);
    res.clearCookie("token");
    res.status(200).send({
      success: true,
      message: "Your Profile Deleted Successfully",
    });
  } catch (err) {
    console.log("error during deleting the profile " + err);
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export {
  checkAuth,
  register,
  login,
  logout,
  getProfile,
  adminRegister,
  adminLogin,
  deleteProfile,
  createdProblemList,
};
