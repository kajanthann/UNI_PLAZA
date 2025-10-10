import express from "express";
import { register, login, verifyOtp, forgotPassword, verifyResetOtp, resetPassword, logout, updateProfile, getProfile } from "../controllers/userController.js";
import { userAuth } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

// OTP verification
userRouter.post("/verify-otp", verifyOtp);

// Forgot/reset password flow
userRouter.post("/forgot-password", forgotPassword);    
userRouter.post("/reset-otp", verifyResetOtp);           
userRouter.post("/reset-password", resetPassword);         

// User profile
userRouter.get("/get-profile", userAuth, getProfile);
userRouter.post("/update-profile", userAuth, upload.single("image"), updateProfile);

export default userRouter;
