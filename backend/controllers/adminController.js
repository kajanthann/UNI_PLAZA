import jwt from "jsonwebtoken";
import sendEmail from "../middleware/sendEmail.js";

// Temporary in-memory OTP store
const adminOtpStore = {}; // Structure: { email: { otp: '123456', expiresAt: Date } }


// --- Request OTP ---
export const requestAdminOtp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    adminOtpStore[email] = { otp, expiresAt };

    await sendEmail(
      email,
      "Admin Login OTP",
      `Hello Admin!\n\nYour OTP is: ${otp}\nIt expires in 5 minutes.`
    );

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

    // Create JWT token
    const aToken = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    delete adminOtpStore[email]; // Remove used OTP

    res.cookie("aToken", aToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).json({ success: true, message: "OTP verified. Admin logged in." });
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    res.status(200).json({ success: true, message: "Admin logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
