import mongoose from "mongoose";

// Reply Schema
const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: { type: Date, default: Date.now },
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

// View Schema
const viewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  viewedAt: { type: Date, default: Date.now },
});

// Report Schema
const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    loginHistory: [
      {
        time: { type: Date, default: Date.now },
        ipAddress: { type: String },
        deviceInfo: { type: String },
      },
    ],
    posts: [
      {
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        comments: [commentSchema],
        views: [viewSchema],
        reports: [reportSchema],
        isPublished: { type: Boolean, default: false },
        publishedAt: { type: Date, default: null },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);


const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;
