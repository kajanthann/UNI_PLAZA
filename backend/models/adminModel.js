import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // unique by name now
  isVerified: { type: Boolean, default: false },
  loginHistory: [
    {
      time: { type: Date, default: Date.now },
      ipAddress: { type: String },
      deviceInfo: { type: String },
    },
  ],
});

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;