import eventModel from "../models/eventModel.js";
import mongoose from "mongoose";

// --- TOGGLE LIKE ---
export const toggleLike = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const isLiked = event.likes.includes(userId);
    if (isLiked) event.likes.pull(userId);
    else event.likes.push(userId);

    await event.save();
    res.json({
      success: true,
      liked: !isLiked,
      totalLikes: event.likes.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- ADD COMMENT ---
export const addComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.comments.push({ user: userId, text });
    await event.save();

    res.json({ success: true, message: "Comment added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- EDIT COMMENT ---
export const editComment = async (req, res) => {
  try {
    const { eventId, commentId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(commentId))
      return res.status(400).json({ message: "Invalid comment ID" });

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const comment = event.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    comment.text = text;
    await event.save();

    res.status(200).json({ success: true, message: "Comment updated", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- DELETE COMMENT ---
export const deleteComment = async (req, res) => {
  try {
    const { eventId, commentId } = req.params;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const comment = event.comments.id(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    event.comments.pull({ _id: commentId });
    await event.save();

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- ADD REPLY ---
export const addReply = async (req, res) => {
  try {
    const { eventId, commentId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const comment = event.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ user: userId, text });
    await event.save();

    res.json({ success: true, message: "Reply added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- TOGGLE COMMENT LIKE ---
export const toggleCommentLike = async (req, res) => {
  try {
    const { eventId, commentId } = req.params;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    const comment = event?.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const isLiked = comment.likes.includes(userId);
    if (isLiked) comment.likes.pull(userId);
    else comment.likes.push(userId);

    await event.save();
    res.json({ success: true, liked: !isLiked, totalLikes: comment.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- ADD VIEW ---
export const addView = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyViewed = event.views.some(v => v.user?.toString() === userId);
    if (!alreadyViewed) event.views.push({ user: userId });

    await event.save();
    res.json({ success: true, totalViews: event.views.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- GET VIEWS ---
export const getViews = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, totalViews: event.views.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- REPORT EVENT ---
export const reportEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { reason } = req.body;
    const userId = req.userId;

    if (!reason) return res.status(400).json({ message: "Reason is required" });

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyReported = event.reports.some(r => r.user.toString() === userId);
    if (alreadyReported) return res.status(400).json({ message: "You already reported this event" });

    event.reports.push({ user: userId, reason });
    await event.save();

    res.status(200).json({ success: true, message: "Event reported successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- GET ALL EVENTS (with populated club/user info) ---
export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find()
      .populate("createdBy.item", "clubName university fullName email") // dynamic populate based on kind
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
