import jwt from "jsonwebtoken";
import clubModel from "../models/clubModel.js";

const authClub = async (req, res, next) => {
  try {
    const token = req.cookies.cToken; // read cookie
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login as a club first.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Find club in DB
    const club = await clubModel.findById(decoded.id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found.",
      });
    }

    // Attach club to request object
    req.club = club;
    next();
  } catch (error) {
    console.error("AuthClub Error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};

export default authClub;
