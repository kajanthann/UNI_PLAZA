import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ["registration", "admin approvel", "capacity", "date"],
            default: "registration"
        },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const notificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default notificationModel;

