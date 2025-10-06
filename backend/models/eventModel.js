import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    mode: { type: String, enum: ["event", "blog"], required: true }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    startTime: { type: String },
    location: { type: String },
    mapLink: { type: String },
    university: { type: String },
    content: { type: String },
    relatedLinks: [
      {
        label: { type: String },
        url: { type: String }
      }
    ],
    contactNumber: { type: String, required: true },
    images: [{ type: String }], 
    email: { type: String, required: true },
    tags: [{ type: String }], 
    status: { type: String, enum: ["approved", "rejected"], default: "approved" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "club", required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
