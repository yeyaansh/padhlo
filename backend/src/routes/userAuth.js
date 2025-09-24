import express from "express";
import {register,login,logout,getProfile, adminRegister, deleteProfile}from "../controllers/userAuthen.js"
import userMiddleware from "../middleware/userMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
const userAuth = express.Router();

userAuth.post("/register",register);
userAuth.post("/login",login);
userAuth.post("/logout",userMiddleware,logout);
userAuth.get("/getProfile",userMiddleware,getProfile);
userAuth.post("/admin/register", adminRegister);
// userAuth.post("/admin/register",adminMiddleware, adminRegister);
userAuth.delete("/deleteProfile",userMiddleware,deleteProfile)

export default userAuth;