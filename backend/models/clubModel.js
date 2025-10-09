import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["club", "community"], required: true },
    clubName: { type: String, required: true },
    university: { type: String, required: true },
    description: { type: String, required: true },
    officialEmail: { type: String, required: true, unique: true },
    fullName: { type: String, required: true }, // head / president name
    email: { type: String, required: true, unique: true }, // login email
    password: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpire: { type: Date, expires: 0 }, // TTL index: remove document when otpExpire < now
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const clubModel = mongoose.models.club || mongoose.model("club", clubSchema);

export default clubModel;
