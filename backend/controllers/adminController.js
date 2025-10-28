import jwt from "jsonwebtoken";
import sendEmail from "../middleware/sendEmail.js";
import clubModel from "../models/clubModel.js";
import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import adminModel from "../models/adminModel.js";
import feedBackModel from "../models/feedBackModel.js";


// Temporary in-memory OTP store
// Structure: { email: { otp: "123456", expiresAt: Date, name: "Admin" } }
const adminOtpStore = {};

// --- STEP 1: Request OTP ---
export const adminLogin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate admin credentials
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes

    // Save OTP in memory
    adminOtpStore[email] = { otp, expiresAt, name };

    // Send OTP via email
    await sendEmail(
      email,
      "Admin Login OTP",
      `Hello ${name || "Admin"}!\n\nYour OTP is: ${otp}\nIt expires in 2 minutes.`
    );

    res.status(200).json({ success: true, message: "OTP sent to admin email" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- STEP 2: Verify OTP & Complete Login ---
export const verifyAdminOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Validate OTP existence
    const otpRecord = adminOtpStore[email];
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "No OTP requested" });
    }

    const { otp: savedOtp, expiresAt, name } = otpRecord;

    // Check expiry
    if (Date.now() > expiresAt) {
      delete adminOtpStore[email];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Check OTP match
    if (otp !== savedOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // --- Find or create admin by name ---
    let admin = await adminModel.findOne({ name: name || "Admin" });

    if (!admin) {
      // Create new admin
      admin = await adminModel.create({
        name: name || "Admin",
        isVerified: true,
        loginHistory: [{ time: new Date(), ipAddress: ip, deviceInfo: userAgent }],
      });
    } else {
      // Check if this device already exists in login history
      const deviceEntry = admin.loginHistory.find(d => d.deviceInfo === userAgent);
      if (deviceEntry) {
        deviceEntry.time = new Date(); // Update last login
      } else {
        admin.loginHistory.push({ time: new Date(), ipAddress: ip, deviceInfo: userAgent });
      }
      await admin.save();
    }

    // --- Generate JWT ---
    const aToken = jwt.sign({ role: "admin", name }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // --- Clear OTP ---
    delete adminOtpStore[email];

    // --- Set cookie ---
    res.cookie("aToken", aToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "OTP verified. Admin logged in.",
      token: aToken,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
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

    res.status(200).json({ success: true, message: `Club ${status} successfully`, club });
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

// --- GET ALL ADMINS ---
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({}, { _id: 0, __v: 0 }); // exclude MongoDB _id and version

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    console.error("Get all admins error:", error);
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

// --- SEND EMAIL ---
export const sendEmailTo = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // --- Input validation ---
    if (!to || typeof to !== "string" || !to.includes("@")) {
      return res.status(400).json({ success: false, message: "Invalid recipient email" });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: "Email subject is required" });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Email message is required" });
    }

    // --- Debug logs ---
    console.log("Sending email:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", text);

    // --- Send email ---
    await sendEmail(to, subject, text);

    console.log(`Email sent successfully to ${to}`);
    return res.status(200).json({ success: true, message: `Email sent to ${to}` });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all user feedback
export const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await feedBackModel
      .find({}, { name: 1, email: 1, subject: 1, message: 1, rating: 1, createdAt: 1, _id: 0 })
      .lean();


    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};