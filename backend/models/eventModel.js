import mongoose from "mongoose";

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
    relatedLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
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
      ref: "club", // ✅ references the club/community who created it
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
