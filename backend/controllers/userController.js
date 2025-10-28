import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../middleware/sendEmail.js";
import userModel from "../models/userModel.js";
import feedBackModel from "../models/feedBackModel.js";

// --- REGISTER ---
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashed });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send OTP email
    await sendEmail(
      email,
      "Verify Your Account",
      `Hello ${name},\n\nYour OTP for account verification is: ${otp}\nIt will expire in 5 minutes.`
    );

    res.status(201).json({
      success: true,
      message: "Account created. OTP sent to your email.",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- VERIFY OTP ---
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    if (!otp) return res.status(400).json({ message: "OTP is required" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (user.otp !== otp || Date.now() > user.otpExpire) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, message: "OTP verified. Account is now active.", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGIN ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Invalid Email" });
    if (!user.isVerified) return res.status(400).json({ success: false, message: "Account not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGOUT ---
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- FORGOT PASSWORD (send OTP) ---
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = otp;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.isResetVerified = false;
    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      `Your OTP to reset password is: ${otp}. It will expire in 10 minutes.`
    );

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- VERIFY RESET OTP ---
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.resetToken || user.resetToken !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (Date.now() > user.resetTokenExpire) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isResetVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: "OTP verified. You can now reset your password." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- RESET PASSWORD ---
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: "Email and new password are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.isResetVerified) {
      return res.status(400).json({ success: false, message: "OTP not verified yet" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpire = null;
    user.isResetVerified = false;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // must be set in auth middleware
    const user = await userModel.findById(userId).select("-password -otp -otpExpire -resetToken -resetTokenExpire -isResetVerified");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, regNo, university, year, faculty, department, phone } = req.body;
    const userId = req.userId; // must be set by auth middleware
    const image = req.file;

    if (!name || !regNo || !university || !year || !faculty || !department || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updateFields = { name, regNo, university, year, faculty, department, phone };
    if (image) updateFields.image = image.filename;

    const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update
// update Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // set in auth middleware
    const { name, regNo, university, year, faculty, department, phone } = req.body;
    const image = req.file;

    // Build an object with only provided fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (regNo) updateFields.regNo = regNo;
    if (university) updateFields.university = university;
    if (year) updateFields.year = year;
    if (faculty) updateFields.faculty = faculty;
    if (department) updateFields.department = department;
    if (phone) updateFields.phone = phone;
    if (image) updateFields.image = image.filename;

    // Make sure at least one field is provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided to update" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password -otp -otpExpire -resetToken -resetTokenExpire -isResetVerified -isVerified");

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// FeesdBack
export const submitFeedback = async (req, res) => {
  try {
    
    const { name, email, message, rating, subject } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email and message are required" });
    }
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }
    if (!subject) {
      return res.status(400).json({ success: false, message: "Subject is required" });
    }
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }
    const feedback = new feedBackModel({ name, email, message, rating, subject });
    await feedback.save();
    res.status(200).json({ success: true, message: "Feedback submitted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}