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
            return res.status(400).json({ success: false, message: "This login email is already registered." });
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



// add event
export const addEvent = async (req, res) => {
    try {
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
            createdBy, // club/community ID
        } = req.body;

        // handle single image upload
        const image = req.file ? req.file.filename : null;

        // Required field validation
        if (!mode || !title || !description || !university || !date || !startTime || !location || !contactNumber || !createdBy || !image) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled, including image and club/community ID.",
            });
        }

        // check club/community exists
        const club = await clubModel.findById(createdBy);
        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Invalid club/community ID.",
            });
        }

        // parse related links and tags if sent as strings
        let parsedLinks = [];
        let parsedTags = [];

        if (relatedLinks) {
            try {
                parsedLinks = JSON.parse(relatedLinks);
            } catch {
                parsedLinks = [{ label: "Link", url: relatedLinks }];
            }
        }

        if (tags) {
            parsedTags = Array.isArray(tags)
                ? tags
                : tags.split(",").map((t) => t.trim());
        }

        // ✅ create new event
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
            createdBy,
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event added successfully. Awaiting admin approval.",
            event: newEvent,
        });
    } catch (error) {
        console.error("Error in addEvent:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
