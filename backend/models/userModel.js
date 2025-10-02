import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpire: { type: Date },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    isResetVerified: { type: Boolean, default: false }

}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
