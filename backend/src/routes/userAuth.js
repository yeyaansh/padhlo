import express from "express";
import {
  checkAuth,
  register,
  login,
  logout,
  getProfile,
  adminRegister,
  deleteProfile,
  adminLogin,
} from "../controllers/userAuthen.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const userAuth = express.Router();

userAuth.get("/checkAuth", userMiddleware, checkAuth);
userAuth.post("/register", register);
userAuth.post("/login", login);
userAuth.post("/logout", userMiddleware, logout);
userAuth.get("/getProfile", userMiddleware, getProfile);
userAuth.post("/admin/register", adminMiddleware, adminRegister); // one admin is creating another admin's account
userAuth.post("/admin/login", adminLogin);
userAuth.delete("/deleteProfile", userMiddleware, deleteProfile);

export default userAuth;
