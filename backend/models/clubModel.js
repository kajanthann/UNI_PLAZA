import mongoose from "mongoose";

const representativeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }, 
    phone: { type: String, required: true },
  },
  { _id: false } // prevent creating separate _id for each subdocument
);

const clubSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["club", "community"], required: true },
    name: { type: String, required: true },
    university: { type: String, required: true },
    description: { type: String, required: true },
    officialEmail: { type: String }, // optional
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    phone: { type: String, required: true },
    image: { type: String, required: true }, // logo/banner
    representatives: [representativeSchema], // members
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const clubModel = mongoose.models.club || mongoose.model("club", clubSchema);

export default clubModel;
