import express from "express";
import { 
  adminLogin, logoutAdmin, verifyAdminOtp,
  getAllClubs, updateClubStatus, deleteClub,
  getAllUsers, deleteUser,
  getAllEvents, updateEventStatus, deleteEvent,
  getAllAdmins,
  sendEmailTo
} from "../controllers/adminController.js";
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

// Public routes (no token required)
adminRouter.post("/login", adminLogin);
adminRouter.post("/verify-otp", verifyAdminOtp);

// Protected routes (token required)
adminRouter.use(authAdmin);

adminRouter.post("/logout", logoutAdmin);
adminRouter.post("/send-email", sendEmailTo);

// Clubs routes
adminRouter.get("/clubs", getAllClubs);
// Unified status update route
adminRouter.put("/clubs/:clubId/:status", updateClubStatus);
adminRouter.delete("/clubs/:clubId", deleteClub);

// Users routes
adminRouter.get("/users", getAllUsers);
adminRouter.delete("/users/:userId", deleteUser);

// Events routes
adminRouter.get("/events", getAllEvents);
// Unified status update route
adminRouter.put("/events/:eventId/:status", updateEventStatus);
adminRouter.delete("/events/:eventId", deleteEvent);

// admin
adminRouter.get('/admins', getAllAdmins)

// Dashboard route
adminRouter.get("/dashboard", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the admin dashboard" });
});

export default adminRouter;
