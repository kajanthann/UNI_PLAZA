import express from "express";
import { register, login, verifyOtp, forgotPassword, verifyResetOtp, resetPassword, logout, isAuth } from "../controllers/userController.js";
import { userAuth } from "../middleware/authUser.js";

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

// Auth check
userRouter.post("/is-auth", userAuth, isAuth);

export default userRouter;
