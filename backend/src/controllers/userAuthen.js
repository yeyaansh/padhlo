import validate from "../utils/vaildate.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import genCookie from "../utils/genCookie.js";
import expireCookie from "../utils/expireCookie.js";
import jwt from "jsonwebtoken";
import submission from "../models/userSubmissionSchema.js";

// register function
const register = async (req, res) => {
  try {
    // validate the data on API level
    validate(req.body);
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "user";
    const newUser = await User.create(req.body);
    // generate token
    const token = genCookie(newUser);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

    res.status(200).send("Successfully Created");
  } catch (err) {
    console.log(err);
    res.status(400).send("error during registration " + err.message);
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
    const validUser = bcrypt.compare(password, existingUser.password);
    if (!validUser) throw new Error("Invalid Credentials");

    // if valid user then pass the data came from db to generate cookie
    const token = genCookie(existingUser);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.send("LoggedIn Successfully");
  } catch (err) {
    console.log(err);
    res.status(401).send("error during logging-in " + err.message);
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
    res.status(200).send("Successfully LoggedOut");
  } catch (err) {
    console.log(err);
    res.status(401).send("error during logging-out " + err.message);
  }
};
// getInfo function
const getProfile = async (req, res) => {
  try {
    // Since we had verified everything in userMiddleware and passed the data with request as result, so we can fetch it from there
    const userData = req.result;

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

const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;
    await User.findByIdAndDelete(userId);
    await submission.deleteMany(userId);
    res.status(200).send("Your Profile Deleted Successfully");
  } catch (err) {
    console.log("error during deleting the profile " + err);
    res.status(500).send(err.message);
  }
};
export {
  register,
  login,
  logout,
  getProfile,
  adminRegister,
  // adminLogin,
  deleteProfile,
};
