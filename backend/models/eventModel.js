import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

const viewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  viewedAt: { type: Date, default: Date.now },
});

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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "club",
      required: true,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [commentSchema],
    views: [viewSchema],
  },
  { timestamps: true, versionKey: false }
);

const eventModel =
  mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
