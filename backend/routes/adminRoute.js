import express from "express";
import { adminLogin, logoutAdmin, verifyAdminOtp } from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js"; // optional, if you want to protect admin routes

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/verify-otp", verifyAdminOtp);
adminRouter.post("/logout", logoutAdmin)


adminRouter.get("/dashboard", authAdmin, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the admin dashboard" });
});

export default adminRouter;
