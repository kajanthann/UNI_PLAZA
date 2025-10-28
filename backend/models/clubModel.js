import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["club", "community"], required: true },
    clubName: { type: String, required: true },
    university: { type: String, required: true },
    description: { type: String, required: true },
    officialEmail: { type: String, required: true, unique: true },
    fullName: { type: String, required: true }, // president name
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpire: { type: Date}, 
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// TTL index: deletes document when otpExpire < now
clubSchema.index({ otpExpire: 1 }, { expireAfterSeconds: 0 });

const clubModel = mongoose.models.club || mongoose.model("club", clubSchema);

export default clubModel;
