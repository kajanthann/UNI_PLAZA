import express from "express";
import { addEvent, clubLogin, deleteEvent, editEvent, registerClub, verifyOtp } from "../controllers/clubController.js";
import upload from "../middleware/multer.js";
import authClub from "../middleware/authClub.js";

const clubRouter = express.Router();

clubRouter.post('/register', upload.single('image'), registerClub);
clubRouter.post('/verify-otp',verifyOtp);
clubRouter.post('/login', clubLogin)

clubRouter.post('/events', authClub ,upload.single('image'), addEvent)
clubRouter.put('/events/:eventId', authClub, upload.single('image'), editEvent)
clubRouter.delete('/events/:eventId', authClub, deleteEvent)
export default clubRouter;