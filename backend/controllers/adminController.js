import jwt from "jsonwebtoken";
import sendEmail from "../middleware/sendEmail.js";
import clubModel from "../models/clubModel.js";
import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";

// Temporary in-memory OTP store for admin login
const adminOtpStore = {}; // { email: { otp: '123456', expiresAt: Date } }

// --- Request OTP ---
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes
    adminOtpStore[email] = { otp, expiresAt };

    await sendEmail(email, "Admin Login OTP", `Hello Admin!\n\nYour OTP is: ${otp}\nIt expires in 2 minutes.`);

    res.status(200).json({ success: true, message: "OTP sent to admin email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Verify OTP & login ---
export const verifyAdminOtp = (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!adminOtpStore[email]) {
      return res.status(400).json({ success: false, message: "No OTP requested" });
    }

    const { otp: savedOtp, expiresAt } = adminOtpStore[email];

    if (Date.now() > expiresAt) {
      delete adminOtpStore[email];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (otp !== savedOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const aToken = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    delete adminOtpStore[email];

    res.cookie("aToken", aToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ success: true, message: "OTP verified. Admin logged in.", token: aToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Admin Logout ---
export const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("aToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ success: true, message: "Admin logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- GET ALL CLUBS ---
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await clubModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, clubs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- UPDATE CLUB STATUS (APPROVE / REJECT / PENDING) ---
export const updateClubStatus = async (req, res) => {
  try {
    const { clubId, status } = req.params;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ success: false, message: "Club not found" });

    if (club.status === status) {
      return res.status(400).json({ success: false, message: `Club is already ${status}` });
    }

    club.status = status;
    await club.save();

    res.status(200).json({ success: true, message: `Club ${status}`, club });
  } catch (error) {
    console.error("Error updating club status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// --- DELETE CLUB ---
export const deleteClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const deleted = await clubModel.findByIdAndDelete(clubId);
    if (!deleted) return res.status(404).json({ success: false, message: "Club not found" });

    res.status(200).json({ success: true, message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- GET ALL USERS ---
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- DELETE USER ---
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await userModel.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- GET ALL EVENTS ---
export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find()
      .populate("createdBy.item", "clubName university fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- UPDATE EVENT STATUS ---
export const updateEventStatus = async (req, res) => {
  try {
    const { eventId, status } = req.params;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (event.status === status) {
      return res.status(400).json({ success: false, message: `Event is already ${status}` });
    }

    event.status = status;
    await event.save();

    res.status(200).json({ success: true, message: `Event ${status}`, event });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// --- DELETE EVENT ---
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleted = await eventModel.findByIdAndDelete(eventId);
    if (!deleted) return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
