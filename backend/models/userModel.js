import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String},
  image: { type: String},
  university: { type: String},
  year: { type: String},
  faculty: { type: String},
  department: { type: String},

  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpire: { type: Date }, 
  resetToken: { type: String },
  resetTokenExpire: { type: Date },
  isResetVerified: { type: Boolean, default: false }
}, { timestamps: true });

// TTL index: deletes user automatically when otpExpire < now
userSchema.index({ otpExpire: 1 }, { expireAfterSeconds: 0 });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
