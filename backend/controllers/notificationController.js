import notificationModel from "../models/notificationModel";
import mongoose from "mongoose";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch notifications" });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const notification = await notificationModel.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        notification.read = true;
        await notification.save();
        return res.status(200).json({ success: true, data: notification });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update notification" });
    }
};

export const deleteNotidication = async (req, res) => {
    try {
        const notification = await notificationModel.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }
        await notificationModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "Notification deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update notification" });
    }
}

