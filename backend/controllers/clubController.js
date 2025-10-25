import bcrypt from "bcrypt";
import validator from "validator";
import clubModel from "../models/clubModel.js";
import eventModel from "../models/eventModel.js";
import sendEmail from "../middleware/sendEmail.js";
import jwt from "jsonwebtoken";

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

    if (!validator.isEmail(officialEmail) || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const existingClub = await clubModel.findOne({ officialEmail });
    if (existingClub) {
      return res.status(400).json({ success: false, message: "This club email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
      otp: otp,
      otpExpire: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    await newClub.save();

    // Send OTP email
    await sendEmail(
      officialEmail,
      "Verify Your Account",
      `Hello ${clubName},\n\nYour OTP for account verification is: ${otp}\nIt will expire in 5 minutes.`
    );


    res.status(201).json({
      success: true,
      message: "Club/Community registered successfully. OTP sent to email.",
      clubId: newClub._id
    });

  } catch (error) {
    console.error("Error in registerClub:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// --- VERIFY OTP ---
export const verifyOtp = async (req, res) => {
  try {
    const { clubId, otp } = req.body;

    const club = await clubModel.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found" });
    if (club.isVerified) return res.status(400).json({ message: "Already verified" });

    if (club.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > club.otpExpire) return res.status(400).json({ message: "OTP expired" });

    // Mark as verified but still pending admin approval
    club.isVerified = true;
    club.otp = null;
    club.otpExpire = null;
    await club.save();

    res.status(200).json({ success: true, message: "OTP verified. Await admin approval.", clubId: club._id });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// club login
export const clubLogin = async (req, res) => {
  try {
    const { officialEmail, password } = req.body;

    if (!officialEmail || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const club = await clubModel.findOne({ officialEmail });
    if (!club) return res.status(404).json({ success: false, message: "Invalid Email" });

    // Must have verified OTP first
    if (!club.isVerified) return res.status(400).json({ success: false, message: "Account not verified by email." });

    // Must be approved by admin
    if (club.status !== "approved") {
      return res.status(403).json({ success: false, message: "Account pending admin approval." });
    }

    const isMatch = await bcrypt.compare(password, club.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Wrong password" });

    // Generate JWT
    const cToken = jwt.sign({ id: club._id, role: club.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("cToken", cToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ success: true, message: "Login successful", cToken });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGOUT ---
export const logout = (req, res) => {
  try {
    res.clearCookie("cToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// --- ADD EVENT ---
export const addEvent = async (req, res) => {
  try {
    const club = req.club; // Authenticated club from middleware
    if (!club) return res.status(401).json({ success: false, message: "Unauthorized" });

    const {
      mode,
      title,
      description,
      university,
      date,
      startTime,
      location,
      mapLink,
      contactNumber,
      relatedLinks,
      tags,
      email,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!mode || !title || !description || !university || !date || !startTime || !location || !image) {
      return res.status(400).json({ success: false, message: "All required fields must be filled, including image." });
    }

    // Parse relatedLinks & tags
    let parsedLinks = [];
    let parsedTags = [];
    if (relatedLinks) {
      try {
        parsedLinks = JSON.parse(relatedLinks);
      } catch {
        parsedLinks = [{ label: "Link", url: relatedLinks }];
      }
    }
    if (tags) parsedTags = Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim());

    const newEvent = new eventModel({
      mode,
      title,
      description,
      university,
      date,
      startTime,
      location,
      mapLink,
      contactNumber,
      relatedLinks: parsedLinks,
      tags: parsedTags,
      email,
      image,
      createdBy: { kind: "club", item: club._id }, // <-- updated here
    });

    await newEvent.save();

    res.status(201).json({ success: true, message: "Event added successfully. Awaiting admin approval.", event: newEvent });

  } catch (error) {
    console.error("Error in addEvent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- EDIT EVENT ---
export const editEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const club = req.club;
    if (!club) return res.status(401).json({ success: false, message: "Unauthorized" });

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    // Only allow editing if createdBy is this club
    if (event.createdBy.kind !== "club" || event.createdBy.item.toString() !== club._id.toString()) {
      return res.status(403).json({ success: false, message: "You can only edit your own events" });
    }

    const fields = ["mode","title","description","date","startTime","location","mapLink","contactNumber","relatedLinks","tags","email"];
    fields.forEach(field => {
      if (req.body[field] !== undefined) event[field] = req.body[field];
    });

    if (req.file) event.image = req.file.filename;

    // Parse relatedLinks & tags
    if (req.body.relatedLinks) {
      try {
        event.relatedLinks = JSON.parse(req.body.relatedLinks);
      } catch {
        event.relatedLinks = [{ label: "Link", url: req.body.relatedLinks }];
      }
    }
    if (req.body.tags) event.tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(",").map(t => t.trim());

    await event.save();

    res.status(200).json({ success: true, message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error in editEvent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- DELETE EVENT ---
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const club = req.club;
    if (!club) return res.status(401).json({ success: false, message: "Unauthorized" });

    const deletedEvent = await eventModel.findOneAndDelete({
      _id: eventId,
      "createdBy.kind": "club",
      "createdBy.item": club._id
    });

    if (!deletedEvent) return res.status(404).json({ success: false, message: "Event not found or you are not authorized to delete it" });

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// --- GET ALL EVENTS ---
export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find()
      .populate("createdBy", "clubName university email") // populate club info
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// profile
export const updateClubProfile = async (req, res) => {
  // TODO
};
