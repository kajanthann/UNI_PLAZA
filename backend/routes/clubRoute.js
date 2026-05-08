import express from "express";
import { addEvent, clubLogin, deleteEvent, editEvent, logout, registerClub, updateClubProfile, verifyOtp, resendOtp } from "../controllers/clubController.js";
import upload from "../middleware/multer.js";
import authClub from "../middleware/authClub.js";
import { getAllEvents, eventsDetails, upComingClosedEvents, getUpcomingDeadlines, eventDate } from "../controllers/eventController.js";

const clubRouter = express.Router();
clubRouter.post('/register', upload.single("image"), registerClub);
clubRouter.post('/verify-otp', verifyOtp);
clubRouter.post('/resend-otp', resendOtp);
clubRouter.post('/login', clubLogin);
clubRouter.post('/logout', authClub, logout);

// Profile endpoints
clubRouter.get('/profile', authClub, (req, res) => {
  res.status(200).json({ success: true, club: req.club });
});
clubRouter.put('/update-profile', authClub, upload.single('image'), updateClubProfile);

// Events
clubRouter.post('/event', authClub, upload.single('image'), addEvent);
clubRouter.put('/events/edit/:eventId', authClub, upload.single('image'), editEvent);
clubRouter.delete('/events/:eventId', authClub, deleteEvent);
clubRouter.get('/events', authClub, getAllEvents);
clubRouter.get('/events-details', authClub, eventsDetails);
clubRouter.get('/upcoming-events', authClub, upComingClosedEvents);
clubRouter.get('/upcoming-events-deadlines', authClub, getUpcomingDeadlines);
clubRouter.get('/events-calender', authClub, eventDate);

export default clubRouter;