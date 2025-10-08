import bcrypt from "bcrypt";
import validator from "validator";
import clubModel from "../models/clubModel.js";

export const registerClub = async (req, res) => {
  try {
    const { 
      role, 
      clubName, 
      university, 
      description, 
      officialEmail, 
      fullName, 
      email, 
      password, 
      confirmPassword, 
      phone 
    } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!role || !clubName || !university || !description || !officialEmail || !fullName || !email || !password || !confirmPassword || !phone || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including club image and official email.",
      });
    }

    if (!validator.isEmail(officialEmail)) {
      return res.status(400).json({ success: false, message: "Invalid official email address." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid login email address." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const existingClub = await clubModel.findOne({ officialEmail });
    if (existingClub) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered with another club/community.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClub = new clubModel({
      role,
      clubName,
      university,
      description,
      officialEmail,
      fullName,
      email,
      password: hashedPassword,
      phone,
      image,
      status: "pending",
    });

    await newClub.save();

    res.status(201).json({
      success: true,
      message: "Club/Community registered successfully. Awaiting admin approval.",
    });
    console.log("Club/Community registered successfully."); 

  } catch (error) {
    console.error("Error in regClub:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
