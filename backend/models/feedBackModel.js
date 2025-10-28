import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true } 
);

const feedBackModel = mongoose.models.FeedBack || mongoose.model("FeedBack", feedbackSchema);

export default feedBackModel;
