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

// Event/Post Schema
const eventSchema = new mongoose.Schema(
  {
    mode: { type: String, enum: ["event", "blog"], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    location: { type: String, required: true },
    mapLink: { type: String },
    university: { type: String, required: true },
    relatedLinks: [{ label: String, url: String }],
    contactNumber: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["approved", "rejected"],
      default: "approved",
    },

    createdBy: {
      kind: { type: String, enum: ["user", "club"], required: true },
      item: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "createdBy.kind" },
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [commentSchema],
    views: [viewSchema],
    reports: [reportSchema],
  },
  { timestamps: true, versionKey: false }
);

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
