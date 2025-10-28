import express from "express";
import { register, login, verifyOtp, forgotPassword, verifyResetOtp, resetPassword, logout, updateProfile, getProfile, updateUserProfile, submitFeedback } from "../controllers/userController.js";
import { userAuth } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import { addComment, addReply, addView, deleteComment, editComment, getViews, reportEvent, toggleCommentLike, toggleLike } from "../controllers/eventController.js";

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
// userRouter.get("/get-profile", userAuth, getProfile);
// userRouter.post("/update-profile", userAuth, upload.single("image"), updateProfile);
userRouter.put("/update-profile", userAuth, upload.single("image"), updateUserProfile);

// like comments
userRouter.post("/:eventId/like", userAuth, toggleLike);
userRouter.post("/:eventId/comments", userAuth, addComment);
userRouter.put("/:eventId/comments/:commentId", userAuth, editComment);
userRouter.delete("/:eventId/comments/:commentId", userAuth, deleteComment);
userRouter.post("/:eventId/comments/:commentId/replies", userAuth, addReply);
userRouter.post("/:eventId/comments/:commentId/like", userAuth, toggleCommentLike);
userRouter.post("/:eventId/view", userAuth, addView);
userRouter.get("/:eventId/views", userAuth, getViews);
userRouter.post("/:eventId/report", userAuth, reportEvent);

userRouter.post('/feedback', submitFeedback);

export default userRouter;
